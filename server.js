const express = require("express");
const connectDB = require("./database/connectdb");
// Restaurants is the restaurants database name & schema
const RestaurantData = require("./models/Restaurants");
require("dotenv").config();
const app = express();
app.use(express.json());

const port = 8000;

app.get("/", (req, res) => {
  res.json({
    name: "de eatery",
    city: "tamale",
    location: "nyohi",
    foods: [
      { name: "banku", image: "image", price: "$20", availabe: true },
      { name: "rice", image: "image", price: "$20", availabe: true },
    ],
  });
});

app.get("/v1/restaurants", () => {
  res.send("restaurants page");
});
app.get("/v1/restaurants/:restaurant", (req, res) => {
  const { restaurant } = req.params;
  res.send(`${restaurant}`);
});

app.post("/createDoc", async (req, res) => {
  try {
    const restaurant = await RestaurantData.create(req.body);
    res.status(201).json({
      status: "successful added to database",
      restaurant: restaurant,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
app.post("/trial", (req, res) => {
  const restaurant = req.body;
  console.log(req.body);
  res.status(201).json({
    status: "successful added to database",
    restaurant: restaurant,
  });
});

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
