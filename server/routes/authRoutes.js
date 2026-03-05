import express from 'express';
import { registerUser, loginUser, getCurrentUser, deleteUser, changePassword } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getCurrentUser)
router.delete('/delete', protect, deleteUser)
router.put('/change-password', protect, changePassword)
export default router;