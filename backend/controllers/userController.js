import Product from "../schemas/productSchema.js";
import Issue from "../schemas/issueSchema.js";
import Company from "../schemas/companySchema.js";

export const fetchAllProducts = async (req, res) => {
    try {
        // 1. Extract page and limit from query parameters (e.g., /api/products/all?page=2&limit=10)
        // Set defaults if the frontend doesn't provide them
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12; // 12 products per page is great for grid UIs

        // 2. Calculate how many documents to skip over
        // Page 1: skip = (1 - 1) * 12 = 0 documents skipped
        // Page 2: skip = (2 - 1) * 12 = 12 documents skipped
        const skipIndex = (page - 1) * limit;

        // 3. Run the query with skip and limit constraints
        // We use .populate() to dynamically fetch the company's name instead of just showing a raw ID!
        const products = await Product.find()
            .select('-description -supportingDocs')
            .populate('company', 'company_name') // Joins company data seamlessly
            .sort({ createdAt: -1 })             // Shows newest products first
            .skip(skipIndex)
            .limit(limit);

        // 4. Get the total count of products in the entire database (crucial for frontend pagination controls)
        const totalProducts = await Product.countDocuments();

        // 5. Return paginated data along with metadata helpers
        return res.status(200).json({
            message: "Catalogue page loaded successfully.",
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            totalItems: totalProducts,
            products: products
        });

    } catch (error) {
        console.error("Fetch Catalogue Error: ", error.message);
        return res.status(500).json({ message: "Server error while loading catalogue." });
    }
};


export const searchProduct = async (req, res) => {
    try {
        // 1. Extract from query parameters instead of body for a standard GET search layout
        const { product_name, company_name } = req.query;

        // Validation: Ensure at least a product name is provided
        if (!product_name) {
            return res.status(400).json({ message: "Product name search query is required." });
        }

        // 🔥 CRUCIAL FIX: Escape special regex characters like ( ) [ ] { } ? * + + . ^ $ |
        const escapedProductName = product_name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

        // Pass the safely escaped string into your regex compiler
        const nameRegex = new RegExp(escapedProductName, 'i');

        // 3. Scenario A: User searches for a Product AND specifies a Company Name
        if (company_name) {
            // Find the target company document first
            const targetCompany = await Company.findOne({ 
                name: { $regex: new RegExp(company_name, 'i') } 
            });

            if (!targetCompany) {
                return res.status(404).json({ message: `Company '${company_name}' not found.` });
            }

            // Find the product matching the name regex that belongs explicitly to this company
            const foundProduct = await Product.findOne({
                name: { $regex: nameRegex },
                company: targetCompany._id
            }).populate('company', 'name email'); // Merges clean company details into the response

            if (!foundProduct) {
                return res.status(404).json({ message: "No matching product found from that specified company." });
            }

            return res.status(200).json({
                message: "Product located successfully.",
                product: foundProduct
            });
        }

        // 4. Scenario B: User only searches by Product Name (No company name filter provided)
        const products = await Product.find({ name: { $regex: nameRegex } })
            .populate('company', 'name');

        if (products.length === 0) {
            return res.status(404).json({ message: "No matching products found." });
        }

        return res.status(200).json({
            message: `Found ${products.length} matching products.`,
            products: products
        });

    } catch (error) {
        console.error("searchProduct-error: ", error.message);
        return res.status(500).json({ message: "Internal server error while searching for products." });
    }
};