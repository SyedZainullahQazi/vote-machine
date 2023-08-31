const { Halka } = require('../../../models/halka/halka');

const updateHalka=async (req, res) => {
    try {
      const { halkaId, halkaIdNew, halkaName } = req.body;
  
      if(halkaId!==halkaIdNew)
      {
        const existingHalka = await Halka.findOne({ halkaId: halkaIdNew });
        if (existingHalka) {
          return res.status(400).json({ message: 'New halkaId already exists.' });
        }
      }
  
      // Find and update the halka record
      const updatedHalka = await Halka.findOneAndUpdate(
        { halkaId: halkaId },
        { halkaId: halkaIdNew, halkaName: halkaName },
        { new: true } // Return the updated record
      );
  
      if (!updatedHalka) {
        return res.status(400).json({ message: 'Halka not found.' });
      }
  
      return res.status(200).json({ message: 'Halka updated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred.' });
    }
  }

  module.exports=updateHalka;