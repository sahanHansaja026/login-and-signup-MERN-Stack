const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const authrouter = require("./route/user"); 

const app = express();



app.use(bodyParser.json());
app.use(cors());


const PORT = 9000; // back end port is 9000
const databas = "mongodb://localhost:27017/baniya"; // mongodb url

mongoose
  .connect(databas, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database is connected");
    app.listen(PORT, () => {
      console.log(`server is running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error", err);
  });
app.use("/api/auth", authrouter);