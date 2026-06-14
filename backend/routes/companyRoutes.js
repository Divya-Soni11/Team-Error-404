import express from 'express';

import { 
    verifyCompany,
    addProduct, 
    fetchCompanyProducts, 
    updateProduct, 
    deleteProduct 
} from '../controllers/companyControllers.js';


const router = express.Router();


router.post('/add-product', verifyCompany, addProduct);
router.get('/my-products', verifyCompany, fetchCompanyProducts);
router.put('/update-product/:id', verifyCompany, updateProduct);
router.delete('/delete-product/:id', verifyCompany, deleteProduct);

export default router;