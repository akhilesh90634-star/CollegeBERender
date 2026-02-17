const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Trainer = require("../models/Trainers");
const Admin = require("../models/Admins");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find user by email (any role)
    let user =
      (await Admin.findOne({ email })) ||
      (await Trainer.findOne({ email })) ||
      (await Student.findOne({ email }));

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 2️⃣ Check password (PLAIN for now)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 3️⃣ Generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login };
