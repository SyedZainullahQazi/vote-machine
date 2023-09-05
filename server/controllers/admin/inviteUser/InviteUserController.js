const User = require('../../../models/users/user'); // Replace with the appropriate User model
const Election = require('../../../models/election-schedule/election-schedule');

const InviteUser = async (req, res) => {
  const { cnic, halkaId, userType } = req.body;

  try {
    const activeElection = await Election.findOne({ active: true });
    const user = await User.findOne({ cnic });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if(user.halkaId)
    {
      if (activeElection) {
        return res.status(403).json({ message: 'Cannot Update during active election' });
      }
    }
   
    user.halkaId = halkaId;
    user.userType = userType;
    await user.save();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { InviteUser };
