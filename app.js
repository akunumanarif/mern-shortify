const express = require("express");
const app = express();
const connect = require("./config/db_connect");
const bodyParser = require("body-parser");
const urlDatabase = require("./models/url");
const expressEjsLayouts = require("express-ejs-layouts");

// Connect to database
connect();

// View engine
app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.set(express.static("public/"));

// Parsing the data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create view index

app.get("/", async (req, res) => {
  res.render("index");
});

// Create new Url

app.post("/", async (req, res) => {
  const { url, customSlug } = req.body;

  const result = await urlDatabase.find({ customSlug });

  if (result.length === 1) return res.json({ msg: "Custom name existed" });
  const resultUrl = "http://" + req.get("host") + "/" + customSlug;

  res.send("Test is ok");
  const newURL = new urlDatabase({
    url,
    customSlug,
    resultUrl,
  });

  newURL
    .save()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

// Get All URL

// app.get("/", async (req, res) => {
//   const result = await urlDatabase.find();
//   res.json(result);
// });

// Get Custom URL

app.get("/:name", async (req, res) => {
  const { name } = req.params;
  const result = await urlDatabase.find({ customSlug: name });

  if (result.length < 1) {
    return res.status(404).json({
      status: 404,
      error: true,
      msg: "Custom Url doesn't exist",
    });
  }
  res.status(200).json({
    success: true,
    data: result,
  });
});

const port = 8000;

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
