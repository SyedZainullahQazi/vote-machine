const mongoose = require('mongoose');
const Election = require('../../models/election-schedule/election-schedule');

async function GetClosestSchedule(req, res) {
  try {
    const currentDateTime = new Date();
    const activeElection = await Election.findOne({
      active: true,
    });

    if (activeElection) {
      res.status(200).json(activeElection);
    } 
    else
     {
      const nextElection = await Election.findOne({
        startDateTime: { $gte: currentDateTime },
      }).sort({ startDateTime: 1 });

      if (nextElection) {
        // If a next election is found, return it
        res.status(200).json(nextElection);
      } else {
        // If no elections are found, return an appropriate message
        res.status(404).json({ message: 'No upcoming elections found.' });
      }
    }
  } catch (error) {
    console.error('Error retrieving closest election:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = GetClosestSchedule;
