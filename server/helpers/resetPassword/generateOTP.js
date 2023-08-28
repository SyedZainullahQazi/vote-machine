const User = require('../../models/users/user'); // Import your User model

const generateUniqueOTP=async ()=>{
  let uniqueOTP = '';
  const characters = '0123456789';
  let existingUser=null; 

  do {
    uniqueOTP = '';
    for (let i = 0; i < 12; i++) {
      uniqueOTP += characters[Math.floor(Math.random() * characters.length)];
    }

    existingUser = await User.findOne({ 'otp.value': uniqueOTP });
  } while (existingUser);

  return uniqueOTP;
}

module.exports= generateUniqueOTP;