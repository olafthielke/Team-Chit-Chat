const express = require('express');
const app = express();
const logger = require('./src/utils/logger');
const config = require('./src/config.js');
const http = require('http');

//init middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//database
const dbPromise = require('./src/models/db')(config.get('db'));

//routes
const userRoutes = require('./src/routes/user-routes');
const connectDB = require('./config/db');
//connect database
connectDB();
userRoutes(app, logger);

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
dbPromise.then(() => {
    server.listen(PORT, () => {
        logger.info(`server listening on port: ${PORT}`)
    });
});



