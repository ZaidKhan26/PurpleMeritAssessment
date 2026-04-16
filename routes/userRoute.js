const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { getAllUsers } = require("../controllers/userController");
router.get("/", authMiddleware, roleMiddleware("admin", "manager"), getAllUsers);

module.exports = router;