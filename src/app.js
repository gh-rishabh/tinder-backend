require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const userRouter = require("./routes/user");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

// app.use("/",authRouter);
app.use("/",userRouter);



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