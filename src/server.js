import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import accessRoutes from './routes/access.js';
import adminRoutes from './routes/admin.js';


dotenv.config();

const app = express();
app.use(express.json());

// CORS setup
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',').map(s=>s.trim());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Basic request logging (dev)
app.use((req,res,next)=>{ console.log(`${req.method} ${req.url}`); next(); });

app.use('/api/auth', authRoutes);
app.use('/api/access', accessRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('Access Management System API is running');
});

const PORT = process.env.PORT || 5000;
if(!process.env.JWT_SECRET){
    console.warn('WARNING: JWT_SECRET is not set. Authentication will fail.');
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}. Allowed origins: ${allowedOrigins.join(', ')}`));