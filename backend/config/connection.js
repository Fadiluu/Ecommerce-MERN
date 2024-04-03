// db.js
const mongoose = require("mongoose");

require("dotenv").config();
const conn = process.env.DB_STRING;

const clientP = mongoose.connect(conn).then(() => {
  console.log("connected");
});

module.exports = clientP;
