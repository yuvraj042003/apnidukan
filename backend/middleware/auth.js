
const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../utils/errorhandlers");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { Error } = require("mongoose");
exports.isauthenticatedUser = catchAsyncError(async (req, res, next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler ("Please login to access this resource.", 401));
    }
     
    const decodedData  = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);

    next();

});
exports.authrizedRoles = (...roles) => {
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next (new ErrorHandler(
                `Role: ${req.user.role} is not allowed to access this resource.`, 403
            ));
        }
        next();
    }
}