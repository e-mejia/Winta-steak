// Make express available along with other required tools
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = 7000;

// Set up routes
app.get("/");

// Star web server
app.listen(PORT, function () {
  console.log(`Listening of port ${PORT}`);
});
