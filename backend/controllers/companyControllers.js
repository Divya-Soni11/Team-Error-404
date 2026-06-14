import Product from "../schemas/productSchema";
import jwt from "jsonwebtoken";



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

export const addProduct=async (req,res)=>{
    try{
        const{name, category, description, images, supportingDocs}=req.body;

        const productManuals=supportingDocs?.manuals || [];
        const extLinks=supportingDocs?.externalLinks || [];
        const companyId = req.company.id;      //from verifyCompany middleware

        const existingProduct= await Product.findOne({name:name, company:companyId})

        if(existingProduct){
            return res.status(400).json({
                message: "This product has already been added!"
            });
        }

        const newProduct=new Product({
            name,
            company:companyId,
            category,
            description,
            images,
            supportingDocs:{
                manuals: productManuals,
                externalLinks: extLinks
            }
        });

        await newProduct.save();
        return res.status(201).json({
            message: "Product successfully added to catalogue!",
            product: newProduct
        });
    }catch(error){
        return res.status(500).json({
            error: error.message
        });
    }
}

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