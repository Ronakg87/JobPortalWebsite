const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', false);

const connectToMongo = () => {
    try {
        mongoose.connect(process.env.MONGOURI , () => {
            console.log(`Connected to mongoDB successfully`);
        })
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectToMongo;