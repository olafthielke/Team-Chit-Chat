const express = require('express');
const app = express();
const logger = require('./src/utils/logger');

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`server listening on port: ${PORT}`)
});


//routes
const userRoutes = require('./src/routes/user-routes');
userRoutes(app, logger);


