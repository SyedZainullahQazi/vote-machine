const Election = require('../../../models/election-schedule/election-schedule');

const getAllElectionSchedules = async (req, res) => {
  try {
    const allSchedules = await Election.find({});
    console.log(allSchedules);
    res.status(200).json(allSchedules);
  } catch (error) {
    console.error('Error retrieving election schedules:', error);
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
};

module.exports = getAllElectionSchedules;
