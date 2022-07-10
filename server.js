const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`server listening on port: ${PORT}`)
});


//routes
app.get('/', (req, res) => res.send("API is running."))


