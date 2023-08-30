const { Halka } = require('../../../models/halka/halka');

const deleteHalka = async (req, res) => {
    const { halkaid } = req.headers; 
    const halkaId=halkaid;
  
    try {
      const deletedRecord = await Halka.deleteOne({ halkaId });
      if (deletedRecord.deletedCount === 1) {
        res.status(200).json({ message: 'Record deleted successfully' });
      } else {
        res.status(404).json({ message: 'Record not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Deletion failed' });
    }
  };  

module.exports = deleteHalka ;
