const express = require("express");
const router = express.Router();

const { userLogin, getProfile } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/login", userLogin);
router.get("/me", authMiddleware, getProfile);

module.exports = router;
