const User = require("../models/user");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
  try {
    const { page, limit, search, role, status } = req.query;
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (role) {
      query.role = role;
    }

    if (status) {
      query.status = status;
    }

    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limitNum);
    const skip = (pageNum - 1) * limitNum;

    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .select("-password");

    return res.status(200).json({
      users,
      pagination: {
        totalUsers,
        totalPages,
        currentPage: pageNum,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    if (!name || !email || !password || !role || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const allowedRoles = ["admin", "manager", "user"];
    const allowedStatuses = ["active", "inactive"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hash = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hash,
      role,
      status,
      createdBy: req.user.id,
      updatedBy: req.user.id,
    });
    await user.save();

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        createdBy: user.createdBy,
        updatedBy: user.updatedBy,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role, status } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (role === "manager") {
      if (role === "admin") {
        return res
          .status(403)
          .json({ message: "Managers cannot update admin users." });
      }

      if (role === "admin") {
        return res
          .status(403)
          .json({ message: "Managers cannot assign admin users." });
      }
    }

    const allowedRoles = ["admin", "manager", "user"];
    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const allowedStatuses = ["active", "inactive"];
    if (role && !allowedStatuses.includes(role)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: id } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
      user.email = email;
    }

    if (name) user.name = name;
    if (role) user.role = role;
    if (status) user.status = status;

    if (password) {
      user.password = await bcrypt.hash(password, 12);
    }

    user.updatedBy = req.user.id;

    await user.save();

    return res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        createdBy: user.createdBy,
        updatedBy: user.updatedBy,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const targetUser = await User.findById(req.params.id).select("-password");

    if (!targetUser) {
      return res.status(404).json({ message: "user not found" });
    }

    if (req.user.role === "manager" && targetUser.role === "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    return res.status(200).json({
      user: {
        id: targetUser._id,
        name: targetUser.name,
        email: targetUser.email,
        role: targetUser.role,
        status: targetUser.status,
        createdBy: targetUser.createdBy,
        updatedBy: targetUser.updatedBy,
        createdAt: targetUser.createdAt,
        updatedAt: targetUser.updatedAt,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const targetUser = await User.findById(id);

    if (!targetUser) {
      return res.status(404).json({ message: "User not Found " });
    }

    if (req.user.role === "manager" && targetUser.role === "admin") {
      return res.status(403).json({ message: "Foridden." });
    }

    if (targetUser.status === "inactive") {
      return res.json({ message: "User already inactive" });
    }

    targetUser.status = "inactive";
    targetUser.updatedBy = req.user.id;

    await targetUser.save();

    return res.status(200).json({
      message: "User deactivated successfully",
      user: {
        id: targetUser._id,
        name: targetUser.name,
        email: targetUser.email,
        role: targetUser.role,
        status: targetUser.status,
        updatedBy: targetUser.updatedBy,
        updatedAt: targetUser.updatedAt,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  getUserById,
  deactivateUser,
};
