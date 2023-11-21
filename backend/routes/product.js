const express = require("express");
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createReview,
  getReviews,
  deleteReview,
} = require("../controllers/productController");
const router = express.Router(); //creating an object of express.Router
const {
  isAuthenticatesUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
//should import isAuthenticatesUser as function not as a module

router.route("/products").get(getProducts);

router
  .route("/product/:id")
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deleteProduct);
router
  .route("/review")
  .put(isAuthenticatesUser, createReview)
  .delete(deleteReview);
router.route("/reviews").get(getReviews);

//Admin routes
router
  .route("/admin/product/new")
  .post(isAuthenticatesUser, authorizeRoles("admin"), newProduct);
module.exports = router;
