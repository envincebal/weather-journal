// Setup empty JS object to act as endpoint for all routes
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const projectData  = [];

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


app.get("/getData", (req, res) => {
  console.log(projectData);
  res.sendStatus(200).send(projectData);
});

app.post("/postdata", (req, res) => {
 const newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content
  }
 

  projectData.push(newEntry);
 
  res.send(projectData);
    console.log(projectData);
});

// Setup Server

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});