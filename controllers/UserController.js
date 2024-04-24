import User from "../db/models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    // const token = generateToken(user._id, user.username);
    // console.log(token);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = generateToken(user._id, user.username);
    // console.log(token);

    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

    return res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export { register, login, logout };
