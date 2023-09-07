const mongoose = require("mongoose");
const halkaModel = require("../halka/halka");

const ElectionSchema = new mongoose.Schema({
  startDateTime: Date,
  endDateTime: Date,
  active: Boolean,
  halka: { type: [halkaModel.halkaSchema], required: false }, // Embed the halka schema directly
});

module.exports= mongoose.model("election", ElectionSchema);


