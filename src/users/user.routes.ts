import { Router } from 'express';
import { UserController } from './user.controller';
import { authMiddleware } from '../shared/auth.middleware';

const router = Router();

// Cognito authentication
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Protected route
router.get('/profile', authMiddleware, UserController.profile);

export default router;
