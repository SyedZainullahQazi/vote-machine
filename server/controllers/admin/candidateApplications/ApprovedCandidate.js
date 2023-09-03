const User = require('../../../models/users/user'); // Replace with the actual path to your User model
const { Halka } = require('../../../models/halka/halka'); // Replace with the actual path to your Halka model

const ApprovedCandidate = async (req, res) => {
  try {
    const  approved  = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      approved._id,
      { userType: 'candidate', appliedAsCandidate:false},
      { new: true }
    );
    const halka = await Halka.findOne({ halkaId: approved.halkaId });
    if (halka) {
      halka.candidates.candidate.push({
        candidateId: approved.userId,
        voteCount: 0,
      });
      await halka.save();
    } else {
      return res.status(404).json({ error: 'Halka not found' });
    }
    return res.status(200).json({ message: 'Candidate approved successfully' });
  } catch (error) {
    console.error('Error approving candidate:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = ApprovedCandidate;
