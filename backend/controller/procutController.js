const Product = require("../models/Productmodel");
const ErrorHandler = require("../utils/errorhandlers");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
const { response } = require("../app");
// Create a Product --admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    sucess: true,
    product,
  });
});
// Get All Products
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultParPage = 8;
  const productsCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultParPage);
  const products = await apiFeatures.query;
  res.status(200).json({
    sucess: true,
    products,
    productsCount,
    resultParPage
  });
});

// Get Product Ditels
exports.getProductDetail = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  return res.status(200).json({
    sucess: true,
    product,
  });
});
// Update Product Ditels --Admin
exports.updateProducts = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      sucess: false,
      message: "Product Not Found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    sucess: true,
    product,
  });
});

// Delete Product --Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      sucess: false,
      message: "Product Not Found",
    });
  }
  await product.remove();
  return res.status(200).json({
    sucess: true,
    message: "Product Deleted Sucessfully",
  });
});

//CREATE NEW REVIEW OR UPDATE THE REVIEW
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { ratings, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    raitngs: Number,
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = ratings), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.noOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    sucess: true,
  });
});
// Get All Reviews
exports.getAllReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return res.status(500).json({
      sucess: false,
      message: "Product Not Found",
    });
  }
  return res.status(200).json({
    sucess: true,
    reviews: product.reviews,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = avg / reviews.length;

  const noOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      noOfReviews,
    },
    {
      new: true,
      runValidators: false,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
