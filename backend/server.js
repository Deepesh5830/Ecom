const express = require("express");
const app = require("./app");
const dotenv = require("dotenv");
const getConnetion = require("./config/database");

//config

dotenv.config({ path: "backend/config/.env" });

// database connction 
getConnetion();
app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json())

app.listen(process.env.PORT, () => {
  console.log(
    `server is started: ${process.env.hostName}: ${process.env.PORT}`
  );
});

//Unhandled Promise Rejection


