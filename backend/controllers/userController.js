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

export const 