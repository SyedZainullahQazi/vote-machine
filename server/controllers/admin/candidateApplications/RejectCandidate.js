const User = require('../../../models/users/user');

const RejectCandidate = async (req, res) => {
  const approved = req.body;
    try {
      const userId = approved._id;
      await User.updateOne({ _id: userId }, { appliedAsCandidate: false,}); // Update both fields in a single object
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Error updating user' });
    }
};

module.exports = RejectCandidate;
