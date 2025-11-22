import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

/**
 * SIGNUP - Register new user
 */
export const signup = async (req, res) => {
  try {
    const { loginId, name, email, password, confirmPassword, role } = req.body;

    // Validation
    if (!loginId || !name || !email || !password || !confirmPassword || !role) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { loginId }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email or Login ID already exists" });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const user = await User.create({
      loginId,
      name,
      email,
      password: hashedPassword,
      role,
      isVerified: false
    });

    // Generate token
    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        loginId: user.loginId,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

/**
 * SIGNIN - Login user
 */
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Check password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(user._id);

    return res.json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        loginId: user.loginId,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

/**
 * REQUEST PASSWORD RESET - Send OTP to email
 */
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP to user
    user.resetOTP = otp;
    user.resetOTPExpiry = otpExpiry;
    await user.save();

    // TODO: Send email with OTP (using nodemailer)
    // For now, return OTP in response (remove in production)
    console.log(`OTP for ${email}: ${otp}`);

    return res.json({
      success: true,
      message: "OTP sent to email",
      // Remove this in production - only for testing
      otp: otp
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

/**
 * VERIFY OTP - Check if OTP is correct
 */
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check OTP
    if (!user.resetOTP || user.resetOTP !== otp) {
      return res.status(401).json({ success: false, message: "Invalid OTP" });
    }

    // Check OTP expiry
    if (new Date() > user.resetOTPExpiry) {
      return res.status(401).json({ success: false, message: "OTP has expired" });
    }

    return res.json({
      success: true,
      message: "OTP verified successfully"
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

/**
 * RESET PASSWORD - Change password with OTP
 */
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;

    if (!email || !otp || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Verify OTP
    if (!user.resetOTP || user.resetOTP !== otp) {
      return res.status(401).json({ success: false, message: "Invalid OTP" });
    }

    if (new Date() > user.resetOTPExpiry) {
      return res.status(401).json({ success: false, message: "OTP has expired" });
    }

    // Hash new password
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    // Update password and clear OTP
    user.password = hashedPassword;
    user.resetOTP = null;
    user.resetOTPExpiry = null;
    await user.save();

    return res.json({
      success: true,
      message: "Password reset successfully"
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

/**
 * GET CURRENT USER - Protected route
 */
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

/**
 * LOGOUT - Clear token (frontend handles this)
 */
export const logout = (req, res) => {
  return res.json({
    success: true,
    message: "Logged out successfully"
  });
};
