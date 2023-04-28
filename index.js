const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const Person = require("./models/Person");

app.use(express.json());

app.get("/", (request, response) => {
  response.status(200).send({ message: "oie" });
});
console.log();
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@apcluster.shmccpz.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000, console.log("server is running on port: 3000"));
  })
  .catch((err) => {
    console.log(err);
  });
