import mongoose from "mongoose";

export const dbconnect = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
        
        // Test database access
        const collections = await conn.connection.db.listCollections().toArray();
        console.log("Available collections:", collections.map(c => c.name));
        
        return true;
    }
    catch(error){
        console.error('Error connecting to Database:', error);
        return false;
    }
}