const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");


//for cors policy
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
  }));

//config
dotenv.config({path:"backend/config/config.env"});
// For Express
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
// For Ruter Path
const product = require("./routes/productRouter.js");
const user = require("./routes/userRouter");
const order = require("./routes/orderRouter");
const payment = require("./routes/paymentRoute");
// For Access product Info
app.use("/api/v1/", product);
app.use("/api/v1/", user);
app.use("/api/v1/", order);
app.use("/api/v1/", payment);

// For Error Handling MiddleWare
const ErrorMiddleWare = require("../backend/middleware/error");

app.use(ErrorMiddleWare);
module.exports = app;
