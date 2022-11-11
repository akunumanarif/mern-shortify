module.exports = {
  mongoURI:
    "mongodb+srv://" +
    process.env.MONGO_URI_USERNAME +
    ":" +
    process.env.MONGO_URI_PASSWORD +
    "@cluster0.ecx0a.mongodb.net/Shortify?retryWrites=true&w=majority",
};
