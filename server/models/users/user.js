const mongoose = require('mongoose');
const { Schema } = mongoose;

const userTypeEnum = ['voter', 'candidate', 'admin'];

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cnic: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{13}$/.test(value);
      },
      message: 'CNIC must be exactly 13 digits',
    },
  },
  userType: {
    type: String,
    enum: userTypeEnum,
    required: true,
  },
  otp: {
    value: { type: String, default: '' },
    updatedAt: { type: Date, default: null },
  },
  profilePic: { type: String, required: true },
  halkaId: { type: String, ref: 'Halka', default: null }, // Reference to the Halka model
  partyName: { type: String, default: '' },
  symbolImg: { type: String, default: '' },
  appliedAsCandidate: { type: Boolean, default: false },
  votedFor: { type: Schema.Types.ObjectId,ref:"User", default: null },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
