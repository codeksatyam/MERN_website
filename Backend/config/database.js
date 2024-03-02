const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

module.exports = connectDatabase;
