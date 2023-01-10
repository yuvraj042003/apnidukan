
const express = require("express");
const { newOrder,
        getSingleOrder, 
        myOrder, 
        getAllOrder,
        updateOrder,
        deleteOrder} = require("../controller/orderController");
const router = express.Router();
const { isauthenticatedUser, authrizedRoles} = require("../middleware/auth");
router.route("/order/new").post(isauthenticatedUser, newOrder);
router.route("/order/:id").get(isauthenticatedUser,getSingleOrder);
router.route("/order/orders/me").get(isauthenticatedUser, myOrder);
router.route("/admin/order/orders").get(isauthenticatedUser,authrizedRoles("admin"), getAllOrder);
router.route("/admin/order/:id").put(isauthenticatedUser,authrizedRoles("admin"), updateOrder)
                                .delete(isauthenticatedUser,authrizedRoles("admin"),deleteOrder);
module.exports = router
