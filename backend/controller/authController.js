import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";

// Signup LOGIC
export const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // checking if the fields are available
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    // Check email already exists in the database
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists." });
    }

    // Check username already exists in the database
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists." });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // profile pics randomly
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png, /avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    // NEW USER
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      image,
    });
    await newUser.save(); //saving the new user to the database
    // remove password from the response
    res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in Signup Controller", error.message);

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }

  // res.send("Signup Route");
};

// Login LOGIC
export const login = async (req, res) => {
  res.send("Login Route");
};

// Logout LOGIC
export const logout = async (req, res) => {
  res.send("Logout Route");
};
