const User = require("../models/user");

const getAllUsers = async (req, res) => {
  const { page, limit, search, role, status } = req.query;
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

  User.countDocuments(query, (err, count) => {
    if (err) {
      return res.status(500).json({ message: "Error counting users" });
    }
    const totalPages = Math.ceil(count / limit);
    const currentPage = Math.min(page, totalPages);
    const skip = (currentPage - 1) * limit;
    User.find(query)
      .skip(skip)
      .limit(limit)
      .exec((err, users) => {
        if (err) {
          return res.status(500).json({ message: "Error fetching users" });
        }
        res.json({
          users,
          totalPages,
          currentPage,
        });
      });
  });
};

module.exports = {
  getAllUsers,
};
