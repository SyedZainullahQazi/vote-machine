const User = require('../../models/users/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || "sajjadbhai";

async function checkLogin(req, res) {
  try {
    const { password, cnic } = req.body;

    const existingUser = await User.findOne({ cnic }); 
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Cnic" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (isPasswordValid) {
      const token = jwt.sign({ sub: existingUser.cnic,type:existingUser.userType }, jwtSecret);
      return res.json({ token });
    } else {
      res.status(400).json({ message: "Invalid Password" });
    }
  } catch (error) {
    console.error('Error checking login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  checkLogin,
};
