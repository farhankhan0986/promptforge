import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import promptRoutes from './routes/promptRoutes.js';
import protect from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

// CORS: Allow the production Vercel domain and any Vercel preview deployments.
// Set CORS_ORIGIN env var to override the production URL if needed.
const allowedOrigin = process.env.CORS_ORIGIN || 'https://promptforge-blush.vercel.app';
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g. server-to-server, curl, mobile apps)
    if (!origin) return callback(null, true);
    // Allow the exact production origin (or env-configured origin)
    if (origin === allowedOrigin) return callback(null, true);
    // Allow any Vercel preview deployment for this project
    // Matches: promptforge-<hash>-<project>.vercel.app
    if (/^https:\/\/promptforge(-[a-z0-9]+)+\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }
    // Allow localhost only in non-production environments
    if (process.env.NODE_ENV !== 'production' && /^http:\/\/localhost:\d+$/.test(origin)) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/prompts', promptRoutes);
const PORT = process.env.PORT || 5000;

app.get('/', async(req, res)=>{
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json({
            data: result.rows,
            message: "DB connected successfully",
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error connecting to the database" });
    }
})

app.get("/api/test", protect, (req, res) => {
  res.json({ message: "Protected route", userId: req.user });
});

app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})