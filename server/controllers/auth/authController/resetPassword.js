const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../../../models/users/user");
const transporter = require("../../../config/nodemailerConfig");
const uniqueOTP = require("../../../helpers/resetPassword/generateOTP");

const JWT_SECRET = process.env.JWT_SECRET || "sajjadbhai";

const ResetPasswordSend = async (req, res) => {
  const { cnic } = req.body;
  try {
    const existingUser = await User.findOne({ cnic });
    if (existingUser) {
      const OTP = await uniqueOTP();
      existingUser.otp.value = OTP;
      existingUser.otp.updatedAt = new Date();
      await existingUser.save();

      const OTP_EMAIL = `Your OTP is : ${OTP}`;
      const mailOptions = {
        from: "cashingp4@gmail.com",
        to: existingUser.email,
        subject: "Password Reset",
        html: OTP_EMAIL,
      };
      await transporter.sendMail(mailOptions);
      console.log("Email Sent");
      res.json({ message: "Password reset link sent to your email" });
    } else {
      return res.status(400).json({ message: "Invalid CNIC - No Such User" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const ResetPassword = async (req, res) => {
  const { OTP, password } = req.body;

  try {
    const user = await User.findOne({ "otp.value": OTP });
    if (user) {
      const hashedPassword = await bcrypt.hash(password, 10);

      user.password = hashedPassword;
      user.otp.value = "";
      await user.save();

      res.status(200).json({ message: "Password Updated: Success" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  ResetPasswordSend,
  ResetPassword,
};
