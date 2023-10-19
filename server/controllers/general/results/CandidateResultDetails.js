const Election = require('../../../models/election-schedule/election-schedule');
const mongoose = require('mongoose');

const CandidateResultDetails = async (req, res) => {
  try {
    const { scheduleId, halkaId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(scheduleId)) {
      return res.status(400).json({ error: '/results' }); // Send a 302 status code for redirection
    }
    const election = await Election.findOne({ _id: scheduleId });

    if (!election) {
      return res.status(404).json({ error: 'Election not found' });
    }

    const halka = election.halka.find((halka) => halka.halkaId === halkaId);

    if (!halka) {
      return res.status(404).json({ error: 'Halka not found' });
    }
    const candidates = halka.candidates.candidate;
    return res.status(200).json(candidates);
  } catch (error) {
    console.error('Error fetching Halka candidates:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = CandidateResultDetails;
