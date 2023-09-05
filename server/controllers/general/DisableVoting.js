const mongoose = require('mongoose');
const Election = require('../../models/election-schedule/election-schedule'); // Import your Election model
const { Halka, Candidate } = require('../../models/halka/halka'); // Import your Halka and Candidate models
const User = require('../../models/users/user'); // Import your User model

async function DisableVoting(electionId) {

    try {
      // Step 1: Update the election's active status to false
      const updatedElection = await Election.findByIdAndUpdate(
        electionId,
        { active: false },
        { new: true }
      );

      if (!updatedElection) {
        console.log("Election not Found with the matching ID");
      }

      // Step 2: Get all Halkas from the Halka model
      const halkas = await Halka.find({});

      // Loop through each Halka
      for (const halka of halkas) {
        // Step 3: Get each candidate from the array of candidates in the Halka
        const candidates = halka.candidates.candidate;

        console.log(candidates);  
        if (Array.isArray(candidates) && candidates.length > 0) 
        {
          for (const candidateData of candidates) 
          {
            const candidateId = candidateData.candidateId;
            
            // Step 4: Calculate total vote counts for this candidate
            const candidate = await Candidate.findById(candidateId);

            if (!candidate) {
              console.error(`Candidate not found with ID: ${candidateId}`);
              continue;
            }

            // Find users who voted for this candidate
            const totalVotes = await User.countDocuments({ votedFor: candidate.cnic });

            // Update the voteCount for this candidate in this Halka
            candidateData.voteCount = totalVotes;
          }

          // Step 5: Save the updated candidate data back to the Halka
          await halka.save();
      }
      else
      {
        console.log('No candidates found for this Halka.');
      }
    }

    // Step 6: Save all Halkas in the election's Halka array
    updatedElection.halka = halkas;
    await updatedElection.save();

    // Step 7: Reset the voteCount field in the Halka's candidates
    for (const halka of halkas) {
      for (const candidateData of halka.candidates.candidate) {
        candidateData.voteCount = 0;
      }
      await halka.save();
    }

    // Step 8: Reset the votedFor field in the User model for future elections
    await User.updateMany({}, { votedFor: null });

    console.log('Election ended, votes counted, and fields reset.');
  } catch (error) {
    console.error('Error ending election:', error);
  }
}

module.exports = DisableVoting;
