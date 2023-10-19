const User = require('../../models/users/user'); // Import the User model
const GetVotersInHalka = async (req, res) => {
  try {
    const { halkaId } = req.body;
    const votersInHalka = await User.find({
      halkaId,
      userType: 'voter',
    }).select('-email -password -symbolImg -partyName');
    res.status(200).json(votersInHalka);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching voters.' });
  }
};

module.exports = GetVotersInHalka;
