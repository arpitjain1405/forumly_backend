const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://localhost/forumly")
  .then(() => console.log("Connecting to database..."))
  .catch((err) => console.error("Could not connect to mongodb", err));

app.listen(3000, console.log("Listening to PORT 3000"));
