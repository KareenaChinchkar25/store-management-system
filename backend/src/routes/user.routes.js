const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");
const userController = require("../controllers/user.controller");

// Admin-only routes
router.get("/", auth, authorize("admin"), userController.getAllUsers);
router.get("/:id", auth, authorize("admin"), userController.getUserById);
router.post(
  "/:userId/stores/:storeId",
  auth,
  authorize("admin"),
  userController.assignUserToStore
);
router.delete(
  "/:userId/stores/:storeId",
  auth,
  authorize("admin"),
  userController.removeUserFromStore
);

module.exports = router;
