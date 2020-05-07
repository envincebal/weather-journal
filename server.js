// Global variables and npm packages.
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const projectData = []; // Array that holds entry data

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

// GET route that retrieves most recent entry from projectData array
app.get("/getdata", (req, res) => {
  res.send(projectData);
});

// POST route which add new entry into projectData array
app.post("/postdata", (req, res) => {
  const newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    feelings: req.body.feelings
  }

  projectData.push(newEntry);
  res.send(projectData);

});

// Setup Server
app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});