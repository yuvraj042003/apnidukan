const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandlers");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please Enter Your Name"],
    maxLength: [30, "Name can not exceed 30 Letters"],
    minLength: [4, "Name can not less than 4 letters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password shoub be grater than 8 Charectors"],
    select: false,
  },
  avatar: {
    type:String
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type:Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT FUNCTION
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
//comparePassword
userSchema.methods.comparePassword = async function (password) {
 return await bcrypt.compare(password, this.password);
};
// Genrating User Password Reset Model
userSchema.methods.getResetPasswordToken = async function (){
  // Genrating Token
  const resetToken = await crypto.randomBytes(20).toString("hex");
  // Hashing and adding to userSchema in the Password
  this.resetPasswordToken = await crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");

  this.resetPasswordExpire = Date.now()+15*60*1000;
  
  return resetToken
};

module.exports = mongoose.model("User", userSchema);


