// Imports
const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require('mongoose');
const { apiRouter } = require("./api");
const { errorHandler } = require("./utils/error_handler")
const passport = require("passport");

// Create an Express Application
const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
require("./passport/passport.js");
require("./database/session.js")(app);

app.use(passport.initialize());
app.use(passport.session());
// Routes
app.use("/api", apiRouter);

// 404 handler
app.use("*", (req, res, next) => {
  res.status(404).json({ data: null, error: { message: "No such API exist", status: 404 }, message: "Not Found" });
});

// This is for all the unhandled errors; each middleware like schemaValidator or authMiddlewares have their own error handler 
app.use(errorHandler);

// Start the server
const server = app.listen(process.env.PORT, async () => {
  const mongoUri = process.env.MONGO_URL;
  try {
    await mongoose.connect(mongoUri);
  } catch (err) {
    console.log(err);
  }
  console.log("Database connected.");
  console.log(`Server listening on ${process.env.BASE_URL}:${server.address().port}`);
});
