import 'dotenv/config';

import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import prisma from './components/Prisma.js';

import './auth.js';

const SERVER_URL = process.env.SERVER_URL;
const BACKEND_PORT = process.env.BACKEND_PORT;
const FRONTEND_PORT = process.env.FRONTEND_PORT;
const SERVER_BACKEND = `${SERVER_URL}:${BACKEND_PORT}`;
const SERVER_FRONTEND = `${SERVER_URL}:${FRONTEND_PORT}`;
const MAX_STORAGE_PER_USER = parseInt(process.env.MAX_STORAGE_PER_USER, 10) || 100 * 1024 * 1024;

const app = express();

app.use(cors({
    origin: SERVER_FRONTEND,
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

async function checkStorageUsed(userId) {
    const storage = await prisma.media.aggregate({
        where: { userId: userId },
        _count: { id: true },
        _sum: { size: true },
    });
    return storage;
}

/**
 * Checks if the user has exceeded their storage limit.
 * @param {string} userId - The unique identifier of the user.
 * @param {number} newFileSize  - The size of the new file being uploaded.
 * @returns {Promise<void>} - Resolves if the user is within the storage limit, otherwise rejects with an error.
 * @returns 
 */
async function checkStorageLimit(userId, newFileSize) {
    const storage = await checkStorageUsed(userId);
    const totalSize = storage._sum.size || 0;

    if (totalSize + newFileSize > MAX_STORAGE_PER_USER) {
        return Promise.reject(new Error('Storage limit exceeded'));
    }
}

/**
 * A middleware function that enforces access policies based on the specified types.
 * @param {string[]} types - An array of policy types to check.
 * @returns {Function} The middleware function.
 */
function policy(types) {
    return (req, res, next) => {
        for (const type of types) {
            if (type === 'auth' && !req.isAuthenticated()) return res.status(401).json({ error: 'Unauthorized' });
            if (type === 'file' && !req.file) return res.status(400).json({ error: 'No file uploaded' });
        }
        next();
    };
}

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback', (req, res, next) => {
    passport.authenticate('google', { session: true }, (err, user, info) => {
        if (err) {
            console.error('Google callback error:', err);
            if (info) console.error('Google callback info:', info);
            return res.status(500).json({ error: 'Google auth failed', details: err.message, info });
        }

        if (!user) {
            console.warn('Google login failed (no user):', info);
            return res.status(401).json({ error: 'No user after Google auth', info });
        }

        req.logIn(user, loginErr => {
            if (loginErr) {
                console.error('Login session error:', loginErr);
                return res.status(500).json({ error: 'Login failed', details: loginErr.message });
            }

            return res.redirect(`${SERVER_FRONTEND}/dashboard`);
        });
    })(req, res, next);
});

app.get('/auth/google/failure', (req, res) => {
    console.error('Google auth failure endpoint:', req.session?.messages);
    return res.status(401).json({
        error: 'Google login failed',
        message: req.session?.messages,
    });
});

app.get('/api/me', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ authenticated: false });
    }

    res.json({
        authenticated: true,
        user: req.user
    });
});

app.post('/auth/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.json({ message: 'Logged out successfully' });
        });
    });
});

// Set up multer configuration for multipart/form-data handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const unique = Date.now() + path.extname(file.originalname);
        cb(null, unique);
    }
});

// Use the disk storage defined above for handling file uploads
const upload = multer({
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024 // Limit file size to 100MB
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('video/')) {
            return cb(new Error('Only video files are allowed'), false);
        }
        cb(null, true);
    }
});

// Create a new entry to an uploaded file
app.post('/api/upload', upload.single('file'), policy(['file', 'auth']), async (req, res) => {
    try {

        try {
            await checkStorageLimit(req.user.id, req.file.size);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

        // Wrap the DB call in a transaction-like method
        const newMedia = await prisma.media.create({
            data: {
                filename: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size,
                userId: req.user.id,
            }
        });

        res.json({message: 'Upload successful', mediaId: newMedia.id});

    } catch (error) {
        // If the database fails, manually "roll back" the file system by deleting the uploaded file
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }

        console.error('Database error, file removed:', error);
        res.status(500).json({error: 'Failed to record upload in database'});
    }
});

// Handle media conversion requests
app.post('/api/convert', upload.single('file'), policy(['file']), (req, res) => {
    const { targetFormat } = req.body;
    const inputPath = req.file.path;
    const outputPath = `uploads/converted-${Date.now()}.${targetFormat}`;

    const cleanUp = () => {
        return Promise.allSettled([
            fs.promises.unlink(inputPath),
            fs.promises.unlink(outputPath)
        ])
    }
    
    ffmpeg(inputPath)
        .toFormat(targetFormat)
        .on('end', () => {
            res.download(outputPath);

            res.on('finish', cleanUp);
            res.on('close', cleanUp);
        })
        .on('error', async (err) => {
            console.error('FFmpeg error:', err);

            await cleanUp();

            if (!res.headersSent) res.status(500).json({error: 'Conversion failed'});
        })
        .save(outputPath);
});

app.get('/api/user/stats', policy(['auth']), async (req, res) => {

    try {
        const storage = await checkStorageUsed(req.user.id);
        const recentFiles = await prisma.media.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: 'desc' },
            take: 5,
        });

        res.json({
            storageRemaining: MAX_STORAGE_PER_USER - storage._sum.size,
            fileCount: storage._count.id,
            totalSize: storage._sum.size || 0,
            recentFiles
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

// Every hour, clean up media files older than 24 hours
setInterval(async () => {
    const oldMedia = await prisma.media.findMany({
        where: { createdAt: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } }
    });

    if (!oldMedia.length) {
        return;
    }

    console.log(`Found ${oldMedia.length}. Cleaning up...`);

    oldMedia.forEach(item => {
        const pathToFile = `uploads/${item.filename}`;
        if (fs.existsSync(pathToFile)) {
            console.log(`Removing old file: ${pathToFile}`);
            fs.unlinkSync(pathToFile);
        }
    });

    await prisma.media.deleteMany({ where: { id: { in: oldMedia.map(m => m.id) } } });
}, 60 * 60 * 1000);

app.listen(BACKEND_PORT, () => {
    console.log(`Server is running on ${SERVER_BACKEND}`);
});
