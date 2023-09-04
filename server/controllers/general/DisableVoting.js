const mongoose = require("mongoose");

const Election = require("../../models/election-schedule/election-schedule");
const { Halka, Candidate } = require("../../models/halka/halka");
const User = require("../../models/users/user");

async function DisableVoting(electionId) {
  try {
    const updatedElection = await Election.findByIdAndUpdate(
      electionId,
      { active: false },
      { new: true }
    );
    if (!updatedElection) {
      console.log("Election not Found with the matching ID");
    }
    const halkas = await Halka.find({});
    for (const halka of halkas) {
      const candidates = halka.candidates.candidate;
      if (Array.isArray(candidates) && candidates.length > 0) {
        for (const candidateData of candidates) {
          const candidateId = candidateData.candidateId;
          
          const candidate = await User.findOne({ _id: candidateId });
          candidateData.partyName = candidate.partyName;
          candidateData.symbolImg = candidate.symbolImg;
          candidateData.username=candidate.username;

          const totalVotes = await User.countDocuments({
            votedFor: candidateId,
          });
          candidateData.voteCount = totalVotes;
        }
        await halka.save();
      } else {
        console.log("No candidates found for this Halka.");
      }
    }
    updatedElection.halka = halkas;
    await updatedElection.save();
    for (const halka of halkas) {
      // for (const candidateData of halka.candidates.candidate) {
      //   candidateData.voteCount = 0;
      // }
      halka.candidates.candidate = [];
      await halka.save();
    }

    await User.updateMany(
      {},
      [
        {
          $set: {
            votedFor: null,
            halkaId: null,
            userType: {
              $switch: {
                branches: [
                  {
                    case: { $eq: ["$userType", "admin"] },
                    then: "$userType", // Keep the existing value for 'admin'
                  },
                ],
                default: "voter", // Set to 'voter' for all other cases
              },
            },
            partyName: "",
            symbolImg: "",
            appliedAsCandidate: false,
          },
        },
      ]
    );    
    
    console.log("Election ended, votes counted, and fields reset.");
  } catch (error) {
    console.error("Error ending election:", error);
  }
}

module.exports = DisableVoting;
