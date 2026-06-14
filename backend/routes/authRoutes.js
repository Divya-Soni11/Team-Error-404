import express from 'express';

import { 
    registerUser, 
    loginUser, 
    registerCompany, 
    loginCompany 
} from '../controllers/authController.js';

const router = express.Router();

// User Auth Endpoints
router.post('/register-user', registerUser);
router.post('/login-user', loginUser);

// Company Auth Endpoints
router.post('/register-company', registerCompany);
router.post('/login-company', loginCompany);

export default router;