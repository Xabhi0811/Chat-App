import User from "../models/models.js";
import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";


// Sign-up function
export const Sign = async (req, res) => {
    const { fullName, password, email, bio } = req.body;

    try {
        if (!fullName || !password || !email || !bio) {
            return res.status(400).json({ success: false, msg: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, msg: "Email already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName,
            password: hashedPassword,
            bio,
            email,
        });

        const token = generateToken(newUser._id);
        res.status(201).json({
            success: true,
            token,
            userData: newUser,
            msg: "Account created successfully"
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, msg: "Account could not be created" });
    }
};

// Login function
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, userData.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, msg: "Invalid email or password" });
        }

        const token = generateToken(userData._id);
        res.json({
            success: true,
            token,
            userData,
            msg: "Login successful"
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, msg: "Login failed" });
    }
};

// Check authentication
export const checkAuth = (req, res) => {
    res.json({ success: true, user: req.user });
};

// Update profile
export const updateProfile = async (req, res) => {
    try {
        const { profilePic, bio, fullName } = req.body;
        const userId = req.user._id;

        let updatedUser;
        if (!profilePic) {
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { bio, fullName },
                { new: true }
            );
        } else {
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { profilePic: upload.secure_url, bio, fullName },
                { new: true }
            );
        }

        res.json({ success: true, user: updatedUser });
    } catch (error) {
       console.error("Error updating profile:", error);
        res.status(500).json({ success: false, msg: "Profile update failed" });
    }
};
