// import dotenv from "dotenv";
import mongoose from "mongoose";

// dotenv.config();
const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected:",conn.connection.host)
    }
    catch(error) {
        console.error("error connecting mongoose");
        process.exit(1);
    }
}

export default connectMongoDB;