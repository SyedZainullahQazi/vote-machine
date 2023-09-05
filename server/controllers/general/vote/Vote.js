const UserModel = require('../../../models/users/user');
const Vote = async (req, res) => {
  try {
    const { voterId, candidateId } = req.body;
    const user = await UserModel.findById(voterId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.votedFor = candidateId;
    await user.save();
    return res.status(200).json({ message: 'Voted' });
  } catch (error) {
    console.error('Error voting:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = Vote;
