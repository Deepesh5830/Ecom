const express = require('express');
const cookieParser = require('cookie-parser');
const errorMiddlerequireware = require('./middleware/error');

const app = express();

app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json());
app.use(cookieParser());

// Route import
const product = require("./routes/productRoute");
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');

app.use("/api",product);  
app.use("/api",user);
app.use("/api",order)

//Midddleware for error
 app.use(errorMiddlerequireware); 



module.exports = app;