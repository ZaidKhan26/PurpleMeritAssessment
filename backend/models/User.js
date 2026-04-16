const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
      validate: {
        validator: function (v) {
          return v.length > 3 && v.length < 50;
        },
        message: "Name must be between 4 and 49 characters",
      },
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v.length >= 6;
        },
        message: "Password must be at least 6 characters long",
      },
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin", "manager"],
      default: "user",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },

  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
