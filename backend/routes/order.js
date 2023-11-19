const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  orders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderControllers");
const router = express.Router();
const {
  isAuthenticatesUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

router.route("/order/new").post(isAuthenticatesUser, newOrder);
router.route("/order/:id").get(isAuthenticatesUser, getSingleOrder);
router.route("/myorders").get(isAuthenticatesUser, myOrders);

//Admin routes
router
  .route("/orders")
  .get(isAuthenticatesUser, authorizeRoles("admin"), orders);
router
  .route("/order/:id")
  .put(isAuthenticatesUser, authorizeRoles("admin"), updateOrder);
router
  .route("/order/:id")
  .delete(isAuthenticatesUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
