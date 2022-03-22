require('dotenv').config();
const mongoose = require('mongoose');

export const connectMongoDB = async () => {
    try {
        let uri; 

        if (process.env.ENVIRONMENT == 'development') {
            uri = process.env.MONGO_URI_DEV
        } else {
            uri = process.env.MONGO_URI_PRO
        }
        
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB connection failed");
        process.exit(1);
    }
}