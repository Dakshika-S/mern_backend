const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const APIFeatures = require("../utils/apiFeatures");

//get Products-  /api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 3;
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .paginate(resPerPage);

  const products = await apiFeatures.query; // const products = await Product.find();
  // console.log(products, "products");
  res.status(200).json({
    sucsess: true,
    count: products.length,
    products,
  });
});
//create product- /api/v1//product/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id; //id has retrieved from userSchema.methods.getJwtToken
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product, // key value pair so product: product
  });
});
// addlikes
//Get single product -/api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
  console.log(req.params.id);
  const product = await Product.findById(req.params.id);

  // console.log(product);
  if (!product) {
    // console.log("addff");
    return next(new ErrorHandler("Product not found", 400)); //creating an object
  }

  res.status(201).json({
    success: true,
    product,
  });
};

//Update Product -/api/v1/product/:id
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
};

//Delete product -/api/v1/product/:id
exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "product not found",
    });
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "product deleted!",
  });
};

//Create Review - api/v1/review
exports.createReview = catchAsyncError(async (req, res, next) => {
  const { productId, rating, comment } = req.body;

  const review = {
    user: req.user.id,
    rating,
    comment,
  };
  const product = await Product.findById(productId);
  //finding user already has a review
  const isReviewed = product.reviews.find((review) => {
    return review.user.toString() == req.user.id.toString();
  });

  if (isReviewed) {
    //updating the review
    product.reviews.forEach((review) => {
      if (review.user.toString() == req.user.id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    //creating the review
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  //finding the avg of the product reviews
  product.ratings =
    product.reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / product.reviews.length;
  product.ratings = isNaN(product.ratings) ? 0 : product.ratings;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//Get Reviews - api/v1/reviews?id={productId}
exports.getReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete Review - api/v1/review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  //filtering the reviews that not matching deleting review id
  const reviews = product.reviews.filter((review) => {
    return review._id.toString() !== req.query.id.toString();
  });
  //num of reviews
  const numOfReviews = reviews.length;
  //finging the average with the filtered reviews
  let ratings =
    reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / product.reviews.length;
  ratings = isNaN(ratings) ? 0 : ratings;
  //saving the product
  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    numOfReviews,
    ratings,
  });
  res.status(200).json({
    success: true,
  });
});
