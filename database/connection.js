import mongoose from "mongoose";

async function databaseConnection() {
    try {
        await mongoose.connect(process.env.MONGO_URI
      );

        
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        // You might want to throw the error or handle it in a way that suits your application
        // For now, I'm rethrowing the error for demonstration purposes
        throw error;
    }
}

export default databaseConnection;
