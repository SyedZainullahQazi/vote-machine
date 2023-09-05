const { Halka } = require('../../../models/halka/halka');
const Election = require('../../../models/election-schedule/election-schedule');

const updateHalka = async (req, res) => {
  try {
   let { halkaId, halkaIdNew, halkaName } = req.body;
    
    const activeElection = await Election.findOne({ active: true });
    if (activeElection) {
      return res.status(400).json({ message: 'Cannot update halka, there is an active election.' });
    }

    if (halkaName && typeof halkaName === 'string') {
      halkaName = halkaName.toUpperCase();
    }

    const existingHalkaWithSameName = await Halka.findOne({ halkaName:halkaName});
    if (existingHalkaWithSameName) {
      return res.status(400).json({ message: 'Halka with the same name already exists.' });
    }

    const updatedHalka = await Halka.findOneAndUpdate(
      { halkaId: halkaId },
      { halkaName: halkaName },
      { new: true }
    );

    if (!updatedHalka) {
      return res.status(400).json({ message: 'Halka not found.' });
    }

    return res.status(200).json({ message: 'Halka updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.' });
  }
};

module.exports = updateHalka;
