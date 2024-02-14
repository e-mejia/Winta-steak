// Make express available along with other required tools
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = 7000;

// Setup Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

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

const sentData = mongoose.model("sentData, formSchema");

// Handle form submission
app.post("/submit", async function (req, res) {
  const formData = {
    name: req.body.name,
    email: req.body.email,
    comments: req.body.comments,
  };

  const dataSent = new sentData(formData);
  await dataSent.save();
});

// Star web server
app.listen(PORT, function () {
  console.log(`Server listening of port ${PORT}`);
});
