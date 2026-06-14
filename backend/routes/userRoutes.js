import express from 'express';

import { 
    fetchAllProducts,
    searchProduct,  
    // verifyUser,
    // reportIssue 
} from '../controllers/userController.js';


const router = express.Router();

// 1. Public Endpoints: Anyone can browse the catalogue
router.get('/products', fetchAllProducts);
router.get('/search-product', searchProduct);

// 2. Protected Endpoints: Only logged-in users can report an issue
// router.post('/report-issue', verifyUser, reportIssue);

export default router;