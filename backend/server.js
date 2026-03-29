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
app.post('/api/upload', upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    try {
        // Wrap the DB call in a transaction-like method
        const newMedia = await prisma.media.create({
            data: {
                filename: req.file.filename,
                originalName: req.file.originalname,
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

app.post('/api/convert', upload.single('file'), (req, res) => {
    const { targetFormat } = req.body;
    const inputPath = req.file.path;
    const outputPath = `uploads/converted-${Date.now()}.${targetFormat}`;

    ffmpeg(inputPath)
        .toFormat(targetFormat)
        .on('end', () => {
            res.download(outputPath, () => {
                fs.unlinkSync(inputPath);
                fs.unlinkSync(outputPath);
            });
        })
        .on('error', (err) => {
            console.error('FFmpeg error:', err);
            res.status(500).json({error: 'Conversion failed'});
        })
        .save(outputPath);
});

setInterval(async () => {
    const oldMedia = await prisma.media.findMany({
        where: { createdAt: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } }
    });

    if (!oldMedia.length) {
        return;
    }

    oldMedia.forEach(item => {
        const pathToFile = `uploads/${item.filename}`;
        if (fs.existsSync(pathToFile)) {
            fs.unlinkSync(pathToFile);
        }
    });

    await prisma.media.deleteMany({ where: { id: { in: oldMedia.map(m => m.id) } } });
}, 60 * 60 * 1000);

app.listen(BACKEND_PORT, () => {
    console.log(`Server is running on ${SERVER_BACKEND}`);
});
