const User = require('../../models/users/user');

const GetUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ cnic: req.cnic });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userDetails = {
      id:user._id,
      username: user.username,
      email: user.email,
      cnic: user.cnic,
      profilePic: user.profilePic,
      halkaId: user.halkaId,
      userType:user.userType,
      appliedAsCandidate:user.appliedAsCandidate,
      votedFor:user.votedFor, 
    };
    res.status(200).json({ user: userDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const GetUserDetailsForInvite=async(req,res)=>{
  try {
    const users = await User.find({ userType: { $ne: "admin" } })
    .select('-password -email -otp -partyName -profilePic -symbolImg -votedFor');
  
    if (!users) {
      return res.status(404).json({ message: 'Voters not found' });
    }
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {GetUserDetails,GetUserDetailsForInvite};