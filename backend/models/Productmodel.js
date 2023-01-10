const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product name"],
    tirm: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter Product description"],
  },
  amount: {
    type: Number,
    required: [true, "Please Enter Product Amount"],
    MaxLength: [8, "Amount Length is not grater than 6"],
  },
  ratings: {
    type: Number,
    default: 0,
    required: [true, "Please rate the product"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: [true],
      },
      url: {
        type: String,
        required: [true],
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter No of Stocks availble. "],
    MaxLength: [4, "MaxLength is not Exceed 4"],
    default: 1,
  },
  noOfReviews:{
    type:Number,
    default:0
  },
  reviews: [
    {
      user:{
      type:mongoose.Schema.ObjectId,
      ref:"User",
      required:true,
      },
      name: {
        type: String,
        required: [true],
      },
      rating: {
        type: Number,
        required: [true],
      },
      comment: {
        type: String,
        required: [true],
      },
    },
  ],

  user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
