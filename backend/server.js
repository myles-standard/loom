import express from 'express';
import cors from 'cors';
import path from 'path';
import multer from 'multer';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

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

// Expect a single file upload with the field name 'file'
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({
        message: 'File uploaded successfully',
        file: req.file.filename
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
