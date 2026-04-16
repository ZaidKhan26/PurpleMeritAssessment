require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user");

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined in .env file");
  process.exit(1);
}

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hash = await bcrypt.hash("KhanZaid123@", 12);

    const seedEmails = [
      "cosmicos41@gmail.com",
      "manager@test.com",
      "user@test.com",
      "inactive@test.com",
    ];

    await User.deleteMany({ email: { $in: seedEmails } });

    await User.create({
      name: "Admin",
      email: "cosmicos41@gmail.com",
      password: hash,
      role: "admin",
      status: "active",
    });

    await User.create({
      name: "Manager",
      email: "manager@test.com",
      password: hash,
      role: "manager",
      status: "active",
    });

    await User.create({
      name: "User",
      email: "user@test.com",
      password: hash,
      role: "user",
      status: "active",
    });

    await User.create({
      name: "Inactive User",
      email: "inactive@test.com",
      password: hash,
      role: "user",
      status: "inactive",
    });

    console.log("Seed users created successfully");
    process.exit();
  } catch (err) {
    console.error("Error seeding users:", err);
    process.exit(1);
  }
}

seedUsers();
