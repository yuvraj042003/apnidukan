const catchAsyncError = require("../middleware/catchAsyncError");
const stripe = require("stripe")(process.env.STIPRE_SECRET_KEY);
exports.processPayment = catchAsyncError(async(req,res,next)=>{
    const mypayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata:{
            company: "ApniDukan"
        }
    });
    res
    .status(200)
    .json({success:true, clint_secret: mypayment.clint_secret});

});
exports.sendStripeApiKey = catchAsyncError(async(req,res,next)=>{
    res.status(200)
    .json({stripeapikey:process.env.STRIPE_API_KEY});

})