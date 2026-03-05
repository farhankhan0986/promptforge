import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import promptRoutes from './routes/promptRoutes.js';
import protect from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: 'https://promptforge-blush.vercel.app' // ✅ no trailing slash
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