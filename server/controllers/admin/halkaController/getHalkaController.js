const { Halka } = require('../../../models/halka/halka');

const getHalkaData = async (req, res) => {
  try {
    const halkaData = await Halka.find({}, 'halkaId halkaName');
    res.status(200).json(halkaData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Data Fetch Failed' });
  }
};

module.exports = getHalkaData ;
