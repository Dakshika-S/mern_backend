const express = require("express");
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const router = express.Router(); //creating an object of express.Router
const {
  isAuthenticatesUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
//should import isAuthenticatesUser as function not as a module

router.route("/products").get(isAuthenticatesUser, getProducts);

router
  .route("/product/:id")
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deleteProduct);

//Admin routes
router
  .route("/admin/product/new")
  .post(isAuthenticatesUser, authorizeRoles("admin"), newProduct);
module.exports = router;
