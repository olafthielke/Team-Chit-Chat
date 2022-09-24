const express = require('express');
const app = express();
const logger = require('./src/utils/logger');

//init middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
const userRoutes = require('./src/routes/user-routes');
const connectDB = require('./config/db');
//connect database
connectDB();
userRoutes(app, logger);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`server listening on port: ${PORT}`)
});


