const mongoose = require("mongoose");
const config = require("../config.json");
const DB_URL = config.MONGODBURL;

let connectionInstance = null;

function connectToDatabase() {
  if (connectionInstance) {
    return connectionInstance;
  }

  mongoose.connect(DB_URL, { useNewUrlParser: true });
  connectionInstance = mongoose.connection;

  connectionInstance.on("error", console.error.bind(console, "MongoDB connection error:"));

  return connectionInstance;
}

module.exports = connectToDatabase;
