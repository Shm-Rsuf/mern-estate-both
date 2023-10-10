import User from "../models/user.model.js";
import bcrypt from "bcrypt";
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);

  const newUser = new User({ username, email, password: hashPass });

  try {
    await newUser.save();
    res.status(200).json("user created successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
