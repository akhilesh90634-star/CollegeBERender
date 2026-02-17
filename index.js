// let express = require("express")
// //we will now import mongoose it is a data base integration library used to integrate our database
// let mongoose = require("mongoose")

// let app = express();
// app.use(express.json());//it is a middleware used for the body which is coming from the front-end and we will convert that body to the json

// app.listen(5000,()=>{
//     console.log("server is running in prt 5000");
// })

require("dotenv").config();

const express = require("express");
let cors = require("cors");
const connectdb = require("./config/db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// database
connectdb();

// routes
app.use("/students", require("./routes/studentRoutes"));
app.use("/trainers", require("./routes/trainerRoutes"));
app.use("/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
