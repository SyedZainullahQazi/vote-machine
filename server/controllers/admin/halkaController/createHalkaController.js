const { Halka } = require('../../../models/halka/halka');
const Election = require('../../../models/election-schedule/election-schedule');

const CreateHalkaCont = async (req, res) => {
  let { halkaName } = req.body.halka;
  let randomNum;
  let isUnique = false;

  while (!isUnique) {
    randomNum = Math.floor(1000 + Math.random() * 9000);
    const existingHalka = await Halka.findOne({ halkaId: randomNum });
    if (!existingHalka) {
      isUnique = true;
    }
  }

  let halkaId = randomNum.toString();
  if (typeof halkaName === "string") {
    halkaName = halkaName.toUpperCase();
  }

  try {
    const activeElection = await Election.findOne({ active: true });
    if (activeElection) {
      return res.status(400).json({ message: 'Cannot add halka, there is an active election.' });
    }

    let existingHalka = await Halka.findOne({ halkaId });
    if (existingHalka) {
      return res.status(400).json({ message: 'halkaId already exists' });
    }
    existingHalka = await Halka.findOne({ halkaName });
    if (existingHalka) {
      return res.status(400).json({ message: 'halka Name already exists' });
    }

    const newHalka = new Halka({
      halkaId,
      halkaName,
      candidates: {
        candidate: [],
      }
    });
    const savedHalka = await newHalka.save();
    res.status(200).json({ message: 'Halka Added' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating Halka' });
  }
};

module.exports = CreateHalkaCont;
