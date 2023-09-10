import mongoose from 'mongoose';

const connection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo db connected: ${conn.connection.port}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connection;