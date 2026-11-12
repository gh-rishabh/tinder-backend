require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json()); // it convert it json into javascript object
app.use(cookieParser());

// app.use("/",authRouter);
app.use("/",authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);



connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(process.env.PORT, () => {
      console.log(`Server is successfully listening on port ${process.env.PORT}...`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });