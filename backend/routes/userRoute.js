const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { getAllUsers, createUser, updateUser, getUserById } = require("../controllers/userController");

router.get("/", authMiddleware, roleMiddleware("admin", "manager"), getAllUsers);

router.post("/", authMiddleware, roleMiddleware("admin"), createUser);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  updateUser
);

router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("admin", "manager"),
    getUserById
)

module.exports = router;