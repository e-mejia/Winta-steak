// Load node modules
const express = require("express");
const ejs = require("ejs");
const cors = require("cors");
// Initialize express
const path = require("path");
const app = express();
const mongoose = require("mongoose");
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

// Define our schema for form data

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  comments: String,
});

//  Define your model

const sentData = mongoose.model("sentData", formSchema);

// Handle form submission
app.post("/submit", async function (req, res) {
  const formData = {
    name: req.body.name,
    email: req.body.email,
    comments: req.body.comments,
  };

  try {
    const dataSent = new sentData(formData);
    await dataSent.save();
    res.redirect("/?success");
  } catch (error) {
    res.redirect("/?error");
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
