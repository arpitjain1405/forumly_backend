const dotenv = require("dotenv")
const express = require("express");
const mongoose = require("mongoose");
const questionRoutes = require('./routes/questionRoutes')
const replyRoutes = require('./routes/replyRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const discussionRoutes = require('./routes/discussionRoutes')
const authRoutes = require('./routes/authRoutes')
const bookmarkRoutes = require('./routes/bookmarkRoutes');

dotenv.config()

const app = express();

app.use(express.json());
app.use('/api/questions', questionRoutes)
app.use('/api/replies', replyRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/discussions', discussionRoutes)
app.use('/api/auths', authRoutes)
app.use('/api/bookmarks', bookmarkRoutes)

const db_url = process.env.DB_URL

mongoose
  .connect(db_url)
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.error("Could not connect to mongodb", err));

const PORT = process.env.PORT ?? 3000
app.listen(PORT, console.log(`Listening to port: ${PORT}...`));
