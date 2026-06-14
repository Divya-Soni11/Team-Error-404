import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // 1. Fetch your connection string from the .env environment file
        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            console.error("❌ Critical Error: MONGO_URI is missing in your .env file!");
            process.exit(1); // Terminates the Node process immediately
        }

        // 2. Attempt the asynchronous connection to MongoDB Atlas or local Compass
        const conn = await mongoose.connect(mongoURI);

        // 3. Log confirmation with the hosting cluster name for easy tracking
        console.log(`🚀 MongoDB Connected Successfully: ${conn.connection.host}`);

    } catch (error) {
        // 4. Log the precise error message if the connection fails (e.g., bad password, network down)
        console.error(`❌ Database Connection Failure: ${error.message}`);
        process.exit(1); // Exit process with failure code
    }
};

export default connectDB;