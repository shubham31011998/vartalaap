const mongoose = require("mongoose");

const MONGO_URL='mongodb+srv://pinkcitywala:ss676787_charcha@cluster0.wqkqc1p.mongodb.net/?retryWrites=true&w=majority'
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.log('error',error)
        process.exit()
     }
};

module.exports = connectDB;