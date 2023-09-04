const { Halka } = require('../../../models/halka/halka');

const CreateHalkaCont = async (req, res) => {
  const { halkaId, halkaName } = req.body.halka;

  try {
    // Check if the halkaId already exists in the database
    const existingHalka = await Halka.findOne({ halkaId });

    if (existingHalka) {
      return res.status(400).json({ message: 'halkaId already exists' });
    }
    const newHalka = new Halka({
      halkaId,
      halkaName,
      candidates: {
        candidate: [],
      }
    });

    // Save the newHalka instance to the database
    const savedHalka = await newHalka.save();
    res.status(200).json({ message: 'Halka Added' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating Halka' });
  }
};

module.exports = CreateHalkaCont;
