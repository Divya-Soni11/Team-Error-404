import Product from "../schemas/productSchema.js";
import jwt from "jsonwebtoken";
import { supabase } from '../config/supabaseConfig.js';


//middleware for authorization to protected routes
export const verifyCompany = (req, res, next) => {
    
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded.role !== 'company') {
            return res.status(403).json({ message: "Access denied. Corporate accounts only." });
        }

        req.company = decoded;
        
        next();
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }
};


export const addProduct = async (req, res) => {
    try {
        // 1. Extract plain text fields from req.body
        const { name, category, description, externalLinks } = req.body;
        const companyId = req.company.id; // From verifyCompany middleware

        // 2. Validation: Check required text elements
        if (!name || !category || !description) {
            return res.status(400).json({ message: "Please fill out all required fields." });
        }

        // 3. Prevent Duplicate Names for this company
        const existingProduct = await Product.findOne({ name, company: companyId });
        if (existingProduct) {
            return res.status(400).json({ message: "You have already registered a product with this name." });
        }

        // 4. Initialize storage arrays for Supabase CDN URLs
        const imageUrls = [];
        const manualUrls = [];

        // 5. Process and upload Images to Supabase (if provided)
        if (req.files && req.files['images']) {
            for (const file of req.files['images']) {
                const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
                
                const { error } = await supabase.storage
                    .from('product-images')
                    .upload(fileName, file.buffer, { contentType: file.mimetype });

                if (error) throw error;

                const { data: publicUrlData } = supabase.storage.from('product-images').getPublicUrl(fileName);
                imageUrls.push(publicUrlData.publicUrl);
            }
        }

        // 6. Process and upload Manuals to Supabase (if provided)
        if (req.files && req.files['manuals']) {
            for (const file of req.files['manuals']) {
                const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
                
                const { error } = await supabase.storage
                    .from('product-manuals')
                    .upload(fileName, file.buffer, { contentType: file.mimetype });

                if (error) throw error;

                const { data: publicUrlData } = supabase.storage.from('product-manuals').getPublicUrl(fileName);
                manualUrls.push(publicUrlData.publicUrl);
            }
        }

        // 7. Handle external links array safely if incoming as a comma-separated string or array
        let parsedLinks = [];
        if (externalLinks) {
            parsedLinks = Array.isArray(externalLinks) ? externalLinks : externalLinks.split(',').map(link => link.trim());
        }

        // 8. Construct and Save the final Unified MongoDB Document
        const newProduct = new Product({
            name,
            company: companyId,
            category,
            description,
            images: imageUrls, // Populated with Supabase links!
            supportingDocs: {
                manuals: manualUrls, // Populated with Supabase links!
                externalLinks: parsedLinks
            }
        });

        await newProduct.save();

        return res.status(201).json({
            message: "Product catalogued completely in a single transaction!",
            product: newProduct
        });

    } catch (error) {
        console.error("Unified Add Product Error: ", error.message);
        return res.status(500).json({ message: "Server error while saving product data." });
    }
};

export const fetchCompanyProducts = async(req,res) =>{
    try{
        const companyId=req.company.id;
        const companyProducts=await Product.find({company:companyId});
        
        if(companyProducts.length===0){
            return res.status(200).json({
                message:"No products listed for this company!",
                products:[]
            });
        }

        return res.status(200).json({
            message: "Products fetched successfully!",
            products:companyProducts
        });

    }catch(error){
        console.log("Fetch Products error, in company dashboard:", error.message);
        return res.status(500).json({
            message:"Internal Server error while fetching company products."
        });
    }

}

export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;  //product id appended at last of the endpoint by frontend
        const companyId = req.company.id; // From verifyCompany middleware
        const { name, category, description, images, supportingDocs } = req.body;

        const foundProduct = await Product.findById(productId);
        if (!foundProduct) {
            return res.status(404).json({ message: "Product not found." });
        }

        // 2. Security Check: Does this product belong to the logged-in company?
        // We use .toString() because product.company is a MongoDB ObjectId
        if (foundProduct.company.toString() !== companyId) {
            return res.status(403).json({ message: "Unauthorized. You can only update your own products." });
        }

        
        const updatedDocs = supportingDocs ? {
            manuals: supportingDocs.manuals || foundProduct.supportingDocs.manuals,
            externalLinks: supportingDocs.externalLinks || foundProduct.supportingDocs.externalLinks
        } : foundProduct.supportingDocs;

        // 4. Perform the update
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                name: name || foundProduct.name,
                category: category || foundProduct.category,
                description: description || foundProduct.description,
                images: images || foundProduct.images,
                supportingDocs: updatedDocs
            },
            { new: true, runValidators: true } // Options: returns the new object & runs schema validations
        );

        return res.status(200).json({
            message: "Product updated successfully!",
            product: updatedProduct
        });

    } catch (error) {
        console.error("Update Product Error: ", error.message);
        return res.status(500).json({ message: "Server error while updating product." });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;  // Product id appended at the end of the endpoint by frontend
        const companyId = req.company.id; // From verifyCompany middleware

        const foundProduct = await Product.findById(productId);
        if (!foundProduct) {
            return res.status(404).json({ message: "Product not found." });
        }

        // 2. Security Check: Does this product belong to the logged-in company?
        // Using .toString() because foundProduct.company is a MongoDB ObjectId
        if (foundProduct.company.toString() !== companyId) {
            return res.status(403).json({ message: "Unauthorized. You can only delete your own products." });
        }

        // 3. Perform the deletion now that ownership is completely verified
        await Product.findByIdAndDelete(productId);

        return res.status(200).json({
            message: "Product deleted from catalogue successfully!"
        });

    } catch (error) {
        console.error("Delete Product Error: ", error.message);
        return res.status(500).json({ message: "Server error while deleting product." });
    }
};