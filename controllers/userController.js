const User = require("../models/user");

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

module.exports = {
  getAllUsers,
};
