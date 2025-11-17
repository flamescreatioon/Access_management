import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';


dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Access Management System API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));