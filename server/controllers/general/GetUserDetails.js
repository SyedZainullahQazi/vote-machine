const User = require('../../models/users/user');

const GetUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ cnic: req.cnic });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userDetails = {
      username: user.username,
      email: user.email,
      cnic: user.cnic,
      usertype: user.usertype,
      profilePic: user.profilePic,
      halkaId: user.halkaId,
      userType:user.userType,
    };
    res.status(200).json({ user: userDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = GetUserDetails;