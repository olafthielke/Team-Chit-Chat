const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const logger = require('../src/utils/logger');

const connectDB = async () => {
    try {
        console.log("start db connection...", db)
        mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true });
        logger.info("MongoDB Connnected...");
    } catch (err) {
        logger.info(err.message);
        //exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;