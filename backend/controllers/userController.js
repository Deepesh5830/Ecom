const ErrorHander = require("../utils/errorhander");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../model/userModel");
const sendToken = require("../model/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
// const Products = require('../model/productModel')

//Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a simple id",
      url: "profilepicUrl",
    },
  });
  sendToken(user, 200, res);
});

//Login User

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  //chacken if user has given password and value

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email and Password", 500));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Not Valid Email or Password"));
  }

  const isPasswordMatch = await user.comparePassword(password);
//  console.log("isPasswordMatch",isPasswordMatch);
  if (!isPasswordMatch) {
    return next(new ErrorHander("Please Enter email or Password", 501));
  }
  sendToken(user, 200, res);
});

//Logout User

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expire: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//Forget Password

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found", 504));
  }
  //Get ResetPassword Token
  const resetToken = user.getResetPassToken();
  //  console.log("forgotPassreserToken" ,resetToken)

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/password/reset/ ${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email 
   then,please ignore it`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} sucessfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHander(error.message, 501));
  }
});

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  // console.log("user =>,",user)

   if (!user) {
     return next(
         new ErrorHander("Reset Password token is invalid or has been expire", 502)
       );
  }

  if (req.body.password !== req.body.confirmpassword) {
    return next(new ErrorHander("Password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200, res);
});


//Get User Detail
exports.getUserDetails = catchAsyncError(async(req,res,next)=>{
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success:true,
    user,
  })
})

// Update Password

exports.updatePassword = catchAsyncError(async(req,res,next)=>{
const user = await User.findById(req.user.id).select("+password");

const isPasswordMatch = await user.comparePassword(req.body.oldPassword);
 
 if(!isPasswordMatch){
  return next(new ErrorHander("Old password is incorrect",400));
 }
if(req.body.newPassword !== req.body.confirmpassword){
  return next(new ErrorHander('password does not match',400))
 }
 user.password = req.body.newPassword

 await user.save()

 sendToken(user,200,res);
  
})

//update User Profile

exports.updateProfile = catchAsyncError(async (req,res,next)=>{

  const newUserData = {
    name:req.body.name,
    email:req.body.email,
  }
  //we will add cloudinary later

  const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  });
  res.status(200).json({
    success:true
  })
})

//get All user (admin)

exports.getAllUser = catchAsyncError(async(req,res,next)=>{
   
   const users = await User.find()

   res.status(200).json({
    success:true,
    users
   })
})

// Get single userdetails (admin)

exports.getSingleUser = catchAsyncError(async(req,res,next)=>{
  const user = await User.findById(req.params.id)
  if(!user){
    return next(new ErrorHander("user not found",400));
  }
  res.status(200).json({
    success:true,
    user
  })
})

// update user role --> Admin

exports.updateUserRole = catchAsyncError(async (req,res,next)=>{

  const newUserData = {
    name:req.body.name,
    email:req.body.email,
    role:req.body.role
  }

  const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  });
  res.status(200).json({
    success:true,
    user
  })
})

//delete user --> admin

exports.deleteUser = catchAsyncError(async(req,res,next)=>{
  const user = await User.findById(req.params.id)
  
  //we will remove clonedinary  later

  if(!user){
    return next(new ErrorHander("user not found",400))
  }
  
  await user.remove()

  res.status(200).json({
    success:true,
    message:"sucessfully delete"
  })

})

