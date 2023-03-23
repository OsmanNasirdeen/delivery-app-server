const RestaurantData = require("../models/Restaurants");

// get all restaurants from database function
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await RestaurantData.find({});
    res.json({ restaurants: restaurants });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// add a restaurant to a database function
const addRestaurant = async (req, res) => {
  try {
    const restaurant = await RestaurantData.create(req.body);
    res.status(201).json({
      status: "successful added to database",
      restaurant: restaurant,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// update a restaurant details from database function
const updateRestaurant = async (req, res) => {
  try {
    const { restaurantName } = req.params;
    const newUpdate = await RestaurantData.findOneAndUpdate(
      { name: restaurantName },
      req.body,
      { new: true, runValidators: true }
    );
    if (!newUpdate) {
      return res.status(201).json({
        msg: `restaurant name ${restaurantName} is not found in database`,
      });
    }
    res.status(201).json({ updated: newUpdate });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = { getAllRestaurants, addRestaurant, updateRestaurant };
