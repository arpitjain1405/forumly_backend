const express = require("express");
const mongoose = require("mongoose");
const questionRoutes = require('./routes/questionRoutes')
const replyRoutes = require('./routes/replyRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const app = express();


app.use(express.json());
app.use('/api/questions', questionRoutes)
app.use('/api/replies', replyRoutes)
app.use('/api/categories', categoryRoutes)

mongoose
  .connect("mongodb://localhost/forumly")
  .then(() => console.log("Connecting to database..."))
  .catch((err) => console.error("Could not connect to mongodb", err));

app.listen(3000, console.log("Listening to PORT 3000"));
