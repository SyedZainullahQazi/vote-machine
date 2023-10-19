const Election = require("../../../models/election-schedule/election-schedule");
const { Halka } = require("../../../models/halka/halka");

const AddSchedule = async (req, res) => {
  try {
    const { startDateTime, endDateTime, active } = req.body;
    const currentDateTime = new Date();

    if (startDateTime < currentDateTime) {
      return res.status(400).json({
        message:
          "Start date and time must be at least the current date and greater than the current time.",
      });
    }
    const halkaCount = await Halka.countDocuments();

    if (halkaCount === 0) {
      return res.status(400).json({
        message: "Cannot add schedule without at least one 'halka'",
      });
    }
    const overlappingSchedules = await Election.find({
      $or: [
        {
          startDateTime: { $lt: endDateTime },
          endDateTime: { $gt: startDateTime },
        },
        {
          startDateTime: { $gte: startDateTime, $lt: endDateTime },
        },
        {
          endDateTime: { $gt: startDateTime, $lte: endDateTime },
        },
      ],
    });

    if (overlappingSchedules.length > 0) {
      return res.status(409).json({
        message: "Schedule conflicts with existing schedules.",
        conflicts: overlappingSchedules,
      });
    }
    const newElection = new Election({
      startDateTime,
      endDateTime,
      active,
    });

    const savedElection = await newElection.save();

    res.status(200).json({
      message: "Election scheduled successfully",
      election: savedElection,
    });
  } catch (error) {
    console.error("Error adding schedule:", error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

module.exports = AddSchedule;
