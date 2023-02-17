const ErrorHandler = require("../utils/errorhandlers");
const catchAsyncError = require("../middleware/catchAsyncError");

const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("cloudinary");
exports.registerUser = catchAsyncError(async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;
  console.log(req.body);

  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });
  console.log(user);

  sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
  } 
  
});

// LOGIN USER

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  // Checking if user and password both enterd by user

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter User Email  and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password ", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  sendToken(user, 200, res);
});

// LOGOUT FUNCTION
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    sucess: true,
    message: "Logged Out",
  });
});

// Forget Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  // Get ResetPassword Token
  const resetToken = await user.getResetPasswordToken ();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `your password reset token is:- \n\n ${resetPasswordUrl} \n\n If you have not 
 intrested then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "E-Commarce Password Recovery",
      message,
    });
    res.status(200).json({
      sucess: true,
      message: `Email send to ${user.email} sucessfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});
// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // Create reset and token key
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is Invalid or has been Expired",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password Doesn't Match", 403));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get User Details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    sucess: true,
    user,
  });
});

// Update User Password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Old Password", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

// Update User Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  // we will update photo after using cloudnary database
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    sucess: true,
    message: "Updated Sucessfully",
  });
});

// Get All User  --admin
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    sucess: true,
    users,
  });
});
// Get Single User -admin
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with this ${req.params.id} id`)
    );
  }
  res.status(200).json({
    sucess: true,
    user,
  });
});

// Update User Role --Admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const userRole = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.user.id, userRole, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    sucess: true,
    message: "Updated Sucessfully",
  });
});

// Delete User --Admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User does not found", 404));
  }

  await user.remove();

  res.status(200).json({
    sucess: true,
    message: "User Deleted Sucessfully",
  });
});
