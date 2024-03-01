// Load node modules
const express = require("express");
const ejs = require("ejs");
const cors = require("cors");
// Initialize express
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const { log } = require("console");
require("dotenv").config();

// Setup Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set view enginge
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Setup Mongodb connection
mongoose.connect(process.env.DB_CONNECTION);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// Define our schema for form data, commenting/more info
const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
  },
});

//  Define your model
const sentData = mongoose.model("sentData", formSchema);

// Handle form submission - comments
app.post("/submit", async function (req, res) {
  const formData = {
    name: req.body.name,
    email: req.body.email,
    comments: req.body.comments,
  };

  try {
    const dataSent = new sentData(formData);
    await dataSent.save();
    let output = `<h3 style="color: Blue">Thank you!  We hope you enjoyed dining at Winta!</h3>
<a href="/">Back home</a>`;

    res.send(output);
  } catch (error) {
    res.redirect("/?error");
  }
});

// Define form reservation schema
const reservationSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  numPeople: {
    type: Number,
    required: true,
  },
  requests: {
    type: String,
  },
});

//  Define reservation model that maps to reservationSchema

const resModel = mongoose.model("resModel", reservationSchema);

// Handle form submission - reservations
app.post("/submit/reservation", async function (req, res) {
  const reservation = {
    date: req.body.date,
    time: req.body.time,
    name: req.body.name,
    numPeople: req.body.numOfPeople,
    requests: req.body.requests,
  };

  try {
    const reservationData = new resModel(reservation);
    await reservationData.save();
    let output = `<h3 style="color: Blue">Thank you ${reservation.name} Your reservation is now confirmed for
                  ${reservation.date} at ${reservation.time}!</h3>
    <h4>We look forward to serving you!</h4>
<a href="/">Back home</a>`;

    res.send(output);
    res.render();
  } catch (error) {
    console.error(error);
  }
});

//GET routes - display pages
//  Root route
app.get("/", function (req, res) {
  res.render("pages/index");
});

app.get("/about", function (req, res) {
  res.render("./pages/about");
});

app.get("/menu", function (req, res) {
  res.render("./pages/menu");
});

app.get("/Gallery", function (req, res) {
  res.render("./pages/gallery");
});
app.get("/Contact", function (req, res) {
  res.render("./pages/contact");
});
app.get("/News", function (req, res) {
  res.render("./pages/news");
});

// Start web server
app.listen(process.env.PORT || 3000, function () {
  console.log(`Server listening of port ${process.env.PORT}`);
});
