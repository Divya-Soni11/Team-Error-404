import dotenv from 'dotenv';
dotenv.config(); // 1. Load environment configurations immediately at the top

import express from 'express';
import cors from 'cors';
import connectDB from './config/dbConfig.js'; // 2. Bring in your database connection file

// 3. Import Your Managed Routers
import authRoutes from './routes/authRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import userRoutes from './routes/userRoutes.js';

// 4. Initialize Express App Instance
const app = express();

// 5. Establish MongoDB Database Connection
connectDB(); 

// 6. Inject Global Middlewares
app.use(cors());
app.use(express.json()); // Parses incoming JSON payloads into req.body

// 7. Mount Application Route Controllers
app.use('/api/auth', authRoutes);       // Example: http://localhost:5000/api/auth/login-company
app.use('/api/company', companyRoutes); // Example: http://localhost:5000/api/company/add-product
app.use('/api/user', userRoutes);       // Example: http://localhost:5000/api/user/products

// 8. Base Health Check Test Route
app.get('/', (req, res) => {
    res.send('Backend Environment Setup Complete and Running!');
});

// 9. Fire Up Server Listener Socket
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server successfully rolling on: http://localhost:${PORT}`);
});