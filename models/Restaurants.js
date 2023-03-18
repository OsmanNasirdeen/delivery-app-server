const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "provide restaurant name"],
    trim: true,
    maxLength: [20, "restaurant name can't be more than 20 characters"],
  },
  urlProfileImage: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    uppercase: true,
    required: [true, "provide restaurant location"],
    trim: true,
    maxLength: [20, "city name can't be more than 20 characters"],
  },
  location: {
    type: String,
    required: [true, "provide restaurant location"],
    trim: true,
    maxLength: [20, "city name can't be more than 20 characters"],
  },
  foods: {
    type: [
      {
        name: {
          type: String,
          required: [true, "provide food name"],
          trim: true,
        },
        price: {
          type: mongoose.Types.Decimal128,
          required: [true, "provide food price"],
          trim: true,
        },
        urlToImage: {
          type: String,
          required: [true, "provide food image url/path"],
        },
      },
    ],
    required: [
      true,
      "provide list of foods offered by the restaurant in json format",
    ],
  },
  workingSchedule: {
    type: {
      workingDays: {
        type: String,
        enum: ["mon - fri", "mon - sat", "mon - sun"],

        required: [
          true,
          "provide working days in string format e.g 'mon - fri' ",
        ],
      },
      nonWorkingDays: {
        type: [String],
        enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun", ""],
        required: [
          true,
          " provide non working days in an array format e.g ['sat','sun' or ('' if no non working day)]  ",
        ],
      },
      workingHours: {
        startTime: String,
        stopTime: String,
      },
    },
    required: [true, "provide working schedule of the restaurant"],
  },
});

const RestaurantData = mongoose.model("Restaurants", schema);
module.exports = RestaurantData;
