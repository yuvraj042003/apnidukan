const ErrorHandler = require("../utils/errorhandlers");
module.exports = (err, req, res, next) => {
    err.statusCode =  err.statusCode || 500;
    err.message  = err.message ||  "Internal Server Error";

// Cast Error 
// Eg: Id = 349dkfdsjf
if(err.name === "CastError"){
    const message  = `Error: Resource Not Found: Invalid Id. ${err.path}`;
    err = new ErrorHandler(message, 400);
}
// Mongoose Duplicate Email
if(err.code === 11000){
    const message  = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
}

// Wrong JWT Token
if(err.code === "JsonWebTokenError"){
    const message  = `Json Web Token is Invalid, try again`;
    err = new ErrorHandler(message, 400);
}
// JWT Expire Error
if(err.code === "TokenExpiredError"){
    const message  = `Token hass been expired, Try again`;
    err = new ErrorHandler(message, 400);
}
    res.status(err.statusCode).json({
            sucess:false,
            error: err.stack,
    });
};