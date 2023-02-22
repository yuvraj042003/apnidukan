const express = require("express");
const router = express.Router();
const { processPayment, sendStripeApiKey } = require("../controller/paymentController");
const {isauthenticatedUser} = require("../middleware/auth");

router.route("/payment/process").post(isauthenticatedUser, processPayment);
router.route("/stripeapikey").get(isauthenticatedUser, sendStripeApiKey);
module.exports =  router;
