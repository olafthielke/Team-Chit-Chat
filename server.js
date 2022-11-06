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
//user
const userRoutes = require('./src/routes/user-routes');
userRoutes(app, logger);

//profile
const profileRoutes = require('./src/routes/profile-routes');
profileRoutes(app, logger);

//auth
const authRoutes = require('./src/routes/auth-routes');
app.use(authRoutes);
authRoutes(app.request, app.response, (response) => { console.log("auth routes response", response) });


const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
dbPromise.then(() => {
    server.listen(PORT, () => {
        logger.info(`server listening on port: ${PORT}`)
    });
});



