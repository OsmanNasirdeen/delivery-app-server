const mongoose = require("mongoose");

const connectDB = async (URL) => {
  try {
    await mongoose.connect(URL);
    console.log(`successfully connected to DB ...`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
