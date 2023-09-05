// cron.js
const cron = require('node-cron');
const mongoose = require('mongoose');

const DisableVoting=require("../controllers/general/DisableVoting");
const Election = require('../models/election-schedule/election-schedule'); 

const schedule = '*/15 * * * * *';

// Create a cron job
cron.schedule(schedule, async () => {
  try {
    // Get the current time
    const currentTime = new Date();

    // Find elections that should start
    const startElections = await Election.find({
      startDateTime: { $lte: currentTime },
      endDateTime: { $gte: currentTime },
      active: false,
    });

    // Find elections that should end
    const endElections = await Election.find({
      endDateTime: { $lte: currentTime },
      active: true,
    });

    // Activate elections that should start
    for (const election of startElections) {
        election.active = true;
        await election.save();
        console.log(`Election started: ${election._id}`);
    }

    // Deactivate elections that should end
    for (const election of endElections) {
      DisableVoting(election._id);
      console.log(`Election ended: ${election._id}`);
    }
  } catch (error) {
    console.error('Error in cron job:', error);
  }
});