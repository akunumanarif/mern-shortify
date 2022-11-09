const express = require("express");
const app = express();
const connect = require("./config/db_connect");

// Connect to database
connect();

const port = 8000;

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
