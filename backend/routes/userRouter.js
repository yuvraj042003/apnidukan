const express = require("express");
const { isauthenticatedUser, authrizedRoles} = require("../middleware/auth");
const { registerUser,
        loginUser,
        logout,
        forgotPassword, 
        resetPassword, 
        getUserDetails,
        updatePassword,
        updateProfile,
        getAllUser,
        getSingleUser,
        updateUserRole,
        deleteUser,
        } = require("../controller/userController");
const router = express.Router();
//const isauthenticatedUser = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isauthenticatedUser,getUserDetails);
router.route("/password/update").put(isauthenticatedUser,updatePassword);
router.route("/profile/update").put(isauthenticatedUser,updateProfile);
router.route("/admin/users").get(isauthenticatedUser,authrizedRoles("admin"),getAllUser);
router.route("/admin/user/:id").get(isauthenticatedUser,authrizedRoles("admin"),getSingleUser);
router.route("/admin/user/:id").put(isauthenticatedUser,authrizedRoles("admin"),updateUserRole);
router.route("/admin/user/:id").get(isauthenticatedUser,authrizedRoles("admin"),getSingleUser)
                               .put(isauthenticatedUser,authrizedRoles("admin"),updateUserRole)
                               .delete(isauthenticatedUser,authrizedRoles("admin"),deleteUser);

module.exports = router