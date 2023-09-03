const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  candidate: [{
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',unique: true, },
    voteCount: Number
  }]
});


const halkaSchema = new mongoose.Schema({
  halkaId: {
    type: String,
    required: true,
    validate: {
        validator: function (value) {
          return /^\d{4}$/.test(value);
        },
        message: 'CNIC must be exactly 4 digits',
      } 
  },
  halkaName: {
    type: String,
    required: true,
    minlength: 3
  },
  candidates: candidateSchema
});

const Halka = mongoose.model('Halka', halkaSchema);
const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = { Halka, Candidate,halkaSchema };
