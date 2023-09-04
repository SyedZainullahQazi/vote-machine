const Schedule=require("../../../models/election-schedule/election-schedule");

const UpdateSchedule = async (req, res) => {
    const { _id, startDateTime, endDateTime } = req.body;
  
    try {
      // Find the existing schedule with the given _id
      const existingSchedule = await Schedule.findById(_id);
  
      if (!existingSchedule) {
        return res.status(404).json({ message: "Schedule not found" });
      }
  
      const conflictingSchedules = await Schedule.find({
        _id: { $ne: _id }, 
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
  
      if (conflictingSchedules.length > 0) {
        return res.status(409).json({ message: "Schedule conflicts with existing records" });
      }
  
      // Update the schedule with new startDateTime and endDateTime
      existingSchedule.startDateTime = startDateTime;
      existingSchedule.endDateTime = endDateTime;
  
      // Save the updated schedule
      const updatedSchedule = await existingSchedule.save();
  
      res.status(200).json({ message: "Schedule updated successfully", updatedSchedule });
    } catch (error) {
      console.error("Error updating schedule:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
module.exports=UpdateSchedule;