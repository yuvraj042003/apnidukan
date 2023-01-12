const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');


// for cors policy
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
  }));
// For Express
app.use(express.json());
app.use(cookieParser());
// For Ruter Path
const product = require("./routes/productRouter.js");
const user = require("./routes/userRouter");
const order = require("./routes/orderRouter");
// For Access product Info
app.use("/api/v1/", product);
app.use("/api/v1/", user);
app.use("/api/v1/", order);

// For Error Handling MiddleWare
const ErrorMiddleWare = require("../backend/middleware/error");
app.use(ErrorMiddleWare);
module.exports = app;
