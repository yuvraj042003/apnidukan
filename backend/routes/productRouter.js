const express = require("express");
const {getAllProducts,
      createProduct,
      updateProducts,
      deleteProduct,
      getProductDetail, createProductReview,
      getProductReviews, 
      deleteReview} = require("../controller/procutController");
const { isauthenticatedUser, authrizedRoles} = require("../middleware/auth");
const router =express.Router();



router.route("/products").get(getAllProducts);
router.route("/admin/products/new")
      .post(isauthenticatedUser,authrizedRoles("admin"),createProduct);
router.route("/admin/products/:id")
      .put(isauthenticatedUser,authrizedRoles("admin"),updateProducts);
router.route("/products/:id")
        .put(isauthenticatedUser,authrizedRoles("admin"),updateProducts)
        .delete(authrizedRoles("admin"),isauthenticatedUser,deleteProduct)
        
router.route("/products/:id").get(getProductDetail);

router.route("/review").put(isauthenticatedUser, createProductReview);
router.route("/review").get(isauthenticatedUser, getProductReviews);
router.route("/reviews").get(getProductReviews).delete(isauthenticatedUser,deleteReview);


module.exports=router; 
