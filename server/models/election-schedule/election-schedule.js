const mongoose = require('mongoose');
const halkaModel=require("../halka/halka")

const ElectionSchema = new mongoose.Schema({
  startDateTime: Date,
  endDateTime: Date,
  active: Boolean,
  halka: [halkaModel.halkaSchema], // Embed the halka schema directly
});

const Election = mongoose.model('election', ElectionSchema);

module.exports = Election;
