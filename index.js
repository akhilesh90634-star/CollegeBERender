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
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectdb = require("./config/db");

const app = express();

// ✅ FIXED CORS (allow all for now)
app.use(
  cors({
    origin: true, // allow any frontend
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ DB
connectdb();

// ✅ Routes
app.use("/students", require("./routes/studentRoutes"));
app.use("/trainers", require("./routes/trainerRoutes"));
app.use("/auth", require("./routes/authRoutes"));

// ✅ Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});