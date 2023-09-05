const User = require('../../../models/users/user');

const GetCandidatesApplications = async (req, res) => {
  try {
    const candidates = await User.find({ appliedAsCandidate: true })
    .select('-password -votedFor -symbolImg -partyName -profilePic -otp -email');
    res.status(200).json(candidates);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ message: 'Error fetching candidates' });
  }
};

module.exports = GetCandidatesApplications;
