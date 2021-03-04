const cors = require("cors");
const todos = require("./routes/todos");
const signUp = require("./routes/signUp");
const signIn = require("./routes/signIn");
const express = require("express");
const mongoose = require("mongoose");

process.on("unhandledRejection", (error) => {
  throw error;
});

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/todos", todos);
app.use("/api/signup", signUp);
app.use("/api/signin", signIn);

app.get("/", (req, res) => {
  res.send("welcome to the todos api...");
});

const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

const mongoose_options = { 
  useCreateIndex: true, //avoid deprecation warnings from the MongoDB driver.
  useNewUrlParser: true, //avoid deprecation warnings from the MongoDB driver.
  useUnifiedTopology: true, //opt in to using the MongoDB driver's new connection management engine.
  family: 4 //Oly search IPV4 addresses for mongoDB.
};

mongoose.connect(uri, mongoose_options)
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));