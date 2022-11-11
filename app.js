const express = require("express");
// Config DOTENV
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
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
app.use(express.static(__dirname + "/public/css"));

// Parsing the data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Global variable

// app.use((req, res, next) => {
//   res.locals.currentUrl =
//     req.protocol + "://" + req.get("host") + req.originalUrl;
//   next();
// });

// Create view index

app.get("/", async (req, res) => {
  res.render("index", { host: req.get("host") });
});

// Create new Url

app.post("/", async (req, res) => {
  const { url, customSlug } = req.body;
  if (url === "" || customSlug === "") {
    return res.render("index", {
      host: req.get("host"),
      error: "Please fill in the blank",
    });
  }

  const result = await urlDatabase.find({ customSlug });

  if (result.length === 1)
    return res.render("index", {
      host: req.get("host"),
      error: "Custom name existed",
    });
  const resultUrl = "http://" + req.get("host") + "/" + customSlug;

  //res.send("Test is ok");
  const newURL = new urlDatabase({
    url,
    customSlug,
    resultUrl,
  });

  newURL
    .save()
    .then((response) =>
      res.render("index", { host: req.get("host"), success: resultUrl })
    )
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

  res.redirect(result[0].url);
  // console.log(result[0].url);
  // res.status(200).json({
  //   success: true,
  //   data: result,
  // });
});

const port = 8000;

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
