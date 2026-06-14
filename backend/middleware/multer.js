import multer from 'multer';

// Store files transiently in memory as a buffer stream before shipping to Supabase
const storage = multer.memoryStorage();

// Filter files if you want to enforce rules (e.g., limit sizes or extensions)
export const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit max
});