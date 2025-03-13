const express = require("express");
const cors = require("cors");
const app = express();

const connectDB = require("../db/db");

connectDB();
const todo = require("../routes/todo");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("💕Welcome to To-Do List App💕");
});
app.use("/api", todo);

app.listen(5000, () => {
  console.log(`Server is Listenning on port 5000`);
});
