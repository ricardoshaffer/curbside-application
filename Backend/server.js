const express = require('express');
const mongoose = require('mongoose');
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
// Add routes, both API and view
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://curbside:password1@ds161446.mlab.com:61446/heroku_9k3dk1wf", {
});

app.listen(PORT, function() {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});