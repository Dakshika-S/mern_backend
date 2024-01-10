const express = require("express");
const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads/user"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  changePassword,
  updateProfile,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/authControllers");
const {
  isAuthenticatesUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
const router = express.Router();

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/password/change").put(isAuthenticatesUser, changePassword);
router.route("/myprofile").get(isAuthenticatesUser, getUserProfile);
router
  .route("/update")
  .put(isAuthenticatesUser, upload.single("avatar"), updateProfile);

//Admin routes
router
  .route("/admin/users")
  .get(isAuthenticatesUser, authorizeRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticatesUser, authorizeRoles("admin"), getUserProfile)
  .put(isAuthenticatesUser, authorizeRoles("admin"), updateUser)
  .delete(isAuthenticatesUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
