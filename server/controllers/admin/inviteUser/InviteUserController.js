// controllers/inviteUserController.js

const User = require('../../../models/users/user'); // Replace with the appropriate User model

const InviteUser = async (req, res) => {
  const { cnic, halkaId, userType } = req.body;

  try {
    // Find the user based on the provided CNIC
    const user = await User.findOne({ cnic });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's halkaId and userType
    user.halkaId = halkaId;
    user.userType = userType;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { InviteUser };
