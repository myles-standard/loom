import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = 5000;

app.get('/api/test', (req, res) => {
    res.json({ message: "Hello from the backend API!" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
