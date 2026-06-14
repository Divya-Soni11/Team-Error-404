import express from 'express';
import { upload } from '../middleware/multer.js';
import { 
    verifyCompany,
    addProduct, 
    fetchCompanyProducts, 
    updateProduct, 
    deleteProduct 
} from '../controllers/companyControllers.js';


const router = express.Router();

// Configure fields to accept up to 5 images and 3 manuals simultaneously
const productUploadFields = upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'manuals', maxCount: 3 }
]);

router.post('/add-product', verifyCompany, productUploadFields, addProduct);
router.get('/my-products', verifyCompany, fetchCompanyProducts);
router.put('/update-product/:id', verifyCompany,productUploadFields, updateProduct);
router.delete('/delete-product/:id', verifyCompany, deleteProduct);

export default router;