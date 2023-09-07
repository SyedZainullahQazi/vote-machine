const User = require('../../models/users/user');

const UpdateCandidate = async (req, res) => {
  const { partyName,appliedAsCandidate,id,image} = req.body;
  const symbolImg = req.file ? req.file.filename : ''; 
    try {
      const userId = id;
      await User.updateOne({ _id: userId }, { appliedAsCandidate: appliedAsCandidate, partyName: partyName,symbolImg:symbolImg});
      res.status(200).json({ message: 'Applied For CandidateShip' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Error updating user' });
    }
};

module.exports = UpdateCandidate;
