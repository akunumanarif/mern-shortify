const express = require("express");
const app = express();
const connect = require("./config/db_connect");
const bodyParser = require("body-parser");
const checkURL = require("./models/url");

// Connect to database
connect();

// Parsing the data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// get data

app.get("/", (req, res) => {
  res.send("Shortify Database is running correctly");
});

app.post("/", async (req, res) => {
  const { url, customSlug } = req.body;

  const result = await checkURL.find({ customSlug });

  if (result.length === 1) return res.json({ msg: "Custom name existed" });
  const resultUrl = "http://" + req.get("host") + "/" + customSlug;
  console.log(resultUrl);
  res.send("Test is ok");
  const newURL = new checkURL({
    url,
    customSlug,
    resultUrl,
  });

  newURL
    .save()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

const port = 8000;

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
