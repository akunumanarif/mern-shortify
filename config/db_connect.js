const mongoose = require("mongoose");

const { mongoURI } = require("./key");

module.exports = () => {
  mongoose.connect(mongoURI, (err) => {
    !err ? console.log("Database connection succesful") : console.log(`${err}`);
  });
};
