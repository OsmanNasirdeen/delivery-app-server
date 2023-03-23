const express = require("express");
const connectDB = require("./database/connectdb");
require("dotenv").config();
const app = express();
const {
  getAllRestaurants,
  addRestaurant,
  updateRestaurant,
} = require("./controllers/controllers");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 8000;

// get all restaurants endpoint
app.get("/", getAllRestaurants);

app.get("/v1/restaurants", () => {
  res.send("restaurants page");
});

// get a single restaurant enpoint
app.get("/v1/restaurants/:restaurant", (req, res) => {
  const { restaurant } = req.params;
  res.send(`${restaurant}`);
});

app.post("/addRestaurant", addRestaurant);
app.patch("/restaurant/update/:restaurantName", updateRestaurant);

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
