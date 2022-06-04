const mongoose = require("mongoose");
const { config } = require('dotenv')
config()

const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  autoCreate: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(() => console.log("Unable to connect to MongoDB Atlas"));
