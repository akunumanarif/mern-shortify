const express = require("express");
const app = express();
const connect = require("./config/db_connect");
const bodyParser = require("body-parser");
const urlDatabase = require("./models/url");

// Connect to database
connect();

// Parsing the data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// get data

app.get("/", (req, res) => {
  res.send("Shortify Database is running correctly");
});

// app.get("/all", (req, res) => {
//   res.json({});
// });

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

// app.get('/', (req, res) => {
//   res.status(200).json({
//     success: true,
//     data:
//   })
// })

app.get("/:name", async (req, res) => {
  const { name } = req.params;
  const result = await urlDatabase.find({ customSlug: name });

  // console.log(customSlug);

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
