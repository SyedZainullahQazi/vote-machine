  // db.js
  const mongoose = require('mongoose');
  const dotenv =require("dotenv").config();

  const connectToDatabase = async () => {
    try {
      await mongoose.connect(dotenv.parsed.dbConnectionString);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };

  module.exports = connectToDatabase;
