const { Halka } = require('./../../../models/halka/halka');
const User = require('../../../models/users/user');

const GetHalkaCandidates = async (req, res) => {
  try {
    const { halkaId } = req.body;
    const halka = await Halka.findOne({ halkaId })
      .populate({
        path: 'candidates.candidate.candidateId',
        model: 'User',
        select: 'partyName symbolImg username halkaId cnic _id',
      });
    if (!halka) {
      return res.status(404).json({ error: 'Halka not found' });
    }

    const candidates = halka.candidates.candidate.map(candidate => ({
      partyName: candidate.candidateId.partyName,
      symbolImg: candidate.candidateId.symbolImg,
      username: candidate.candidateId.username,
      halkaId: candidate.candidateId.halkaId,
      cnic:candidate.candidateId.cnic,
      id:candidate.candidateId._id,
    }));
    return res.status(200).json(candidates);
  } catch (error) {
    console.error('Error fetching Halka candidates:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = GetHalkaCandidates;
