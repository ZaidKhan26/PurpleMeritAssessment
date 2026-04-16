const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { getAllUsers, createUser, updateUser } = require("../controllers/userController");

router.get("/", authMiddleware, roleMiddleware("admin", "manager"), getAllUsers);

router.post("/", authMiddleware, roleMiddleware("admin"), createUser);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  updateUser
);

module.exports = router;