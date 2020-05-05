// Setup empty JS object to act as endpoint for all routes
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const weatherData = [];

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

app.get("/", (req, res) => {
  res.send(weatherData);
});

app.post("/", (req, res) => {
  const newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content
  }

  weatherData.push(newEntry);
});

// Setup Server

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});