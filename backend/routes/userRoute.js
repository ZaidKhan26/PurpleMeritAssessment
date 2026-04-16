const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { getAllUsers, createUser } = require("../controllers/userController");

router.get("/", authMiddleware, roleMiddleware("admin", "manager"), getAllUsers);

router.post("/", authMiddleware, roleMiddleware("admin"), createUser);

module.exports = router;