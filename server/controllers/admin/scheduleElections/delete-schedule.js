const Election = require('../../../models/election-schedule/election-schedule'); // Make sure to import your Election model

const deleteElectionSchedule = async (req, res) => {
  const { _id } = req.body;

  try {
    const deletedSchedule = await Election.findByIdAndDelete(_id);

    if (!deletedSchedule) {
      return res.status(404).json({ message: 'Election schedule not found' });
    }

    res.status(200).json({ message: 'Election schedule deleted successfully' });
  } catch (error) {
    console.error('Error deleting election schedule:', error);
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
};

module.exports =deleteElectionSchedule;
