const express = require("express");
const connectDB = require("./database/connectdb");
require("dotenv").config();
const app = express();

const {
  getAllRestaurants,
  getRestaurant,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("./controllers/controllers");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 8000;

// get all restaurants endpoint
app.get("/", getAllRestaurants);

// get a single restaurant enpoint
app.get("/v1/restaurants/:restaurantName", getRestaurant);

// add restaurant to database
app.post("/addRestaurant", addRestaurant);
// update a restaurant in database
app.patch("/restaurant/update/:restaurantName", updateRestaurant);
app.delete("/restaurant/update/:restaurantName", deleteRestaurant);

const startServer = async () => {
  try {
    await connectDB(process.env.mongo_connection_string);
    app.listen(port, () => {
      console.log(`app listening at port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
