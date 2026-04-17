const express = require("express");
const router = express.Router();

const { userLogin, getProfile, updateProfile } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/login", userLogin);
router.get("/me", authMiddleware, getProfile);
router.patch("/me", authMiddleware, updateProfile);

module.exports = router;
