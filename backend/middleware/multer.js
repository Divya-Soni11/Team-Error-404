import multer from 'multer';

// Store files transiently in memory as a buffer stream before shipping to Supabase
const storage = multer.memoryStorage();

// Filter files if you want to enforce rules (e.g., limit sizes or extensions)
export const upload = multer({ 
    storage: storage,
    limits: { fileSize: 15 * 1024 * 1024 } // 15MB limit max(max limit for manuals, set on supabase)
});

// 2. Custom validation middleware to enforce the stricter 5MB limit on images
export const validateFileSizes = (req, res, next) => {
    if (!req.files) return next(); // No files uploaded? Skip validation safely.

    // Validate Images field specifically (Max 5MB per image)
    if (req.files['images']) {
        const FIVE_MB = 5 * 1024 * 1024;
        for (const file of req.files['images']) {
            if (file.size > FIVE_MB) {
                return res.status(400).json({ 
                    message: `Upload failed. The image '${file.originalname}' exceeds the maximum allowed limit of 5MB.` 
                });
            }
        }
    }

    // Manuals automatically adhere to the global 15MB limit handled by Multer
    next();
};