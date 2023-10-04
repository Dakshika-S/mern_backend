const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const APIFeatures = require("../utils/apiFeatures");

//get Products-  /api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 2;
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .paginate(resPerPage);

  const products = await apiFeatures.query; // const products = await Product.find();
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

//Get single product -/api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
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
