const express = require("express");
const { newOrder, getSingleOrder } = require("../controllers/orderControllers");
const router = express.Router();
const { isAuthenticatesUser } = require("../middlewares/authenticate");

router.route("/order/new").post(isAuthenticatesUser, newOrder);
router.route("/order/:id").get(isAuthenticatesUser, getSingleOrder);

module.exports = router;
