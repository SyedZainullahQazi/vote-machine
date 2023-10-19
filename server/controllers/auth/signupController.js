const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET; 

const User = require('../../models/users/user');

async function addUser(req, res) {
  try {
    const { name, email, password, cnic, userType } = req.body;
    const profilePic = req.file ? req.file.filename : '';   
    
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const existingCNIC = await User.findOne({ cnic });
    if (existingCNIC) {
      return res.status(400).json({ message: 'CNIC is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      username: name,
      password: hashedPassword,
      cnic: cnic,
      email: email,
      profilePic: profilePic,
      userType: userType,
    });

    await newUser.save();
    const token = jwt.sign({ sub: newUser.cnic,type:newUser.userType}, jwtSecret);
    return res.json({ token });

  } catch (error) {
    console.error('Error adding user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  addUser,
};
