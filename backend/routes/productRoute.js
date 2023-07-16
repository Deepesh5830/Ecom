const express = require("express");
const {
  getAllProducts,
  createProuct,
  updateAllProducts,
  deleteProduct,
  getProductId,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
//const { createProductReview } = require("../controllers/userController");
const { isAuthenticatedUser, authorizRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/product")
  .post(isAuthenticatedUser, authorizRoles("admin"), createProuct);
router
  .route("/admin/productupdate/:id")
  .put(isAuthenticatedUser, authorizRoles("admin"), updateAllProducts);
router
  .route("/admin/delete/:id")
  .delete(isAuthenticatedUser, authorizRoles("admin"), deleteProduct);

router.route("/getproduct/:id").get(getProductId);

router.route("/review").put(isAuthenticatedUser,createProductReview);

router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReview)

module.exports = router;
