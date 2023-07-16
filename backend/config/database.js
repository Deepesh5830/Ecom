const mongoose = require('mongoose');
const dotenv = require("dotenv");
const e = require('express');
dotenv.config({ path: "backend/config/.env" });
const MON_URL = process.env.MON_URL;

 const getConnetion = () =>{
    mongoose.set("strictQuery", false);
    mongoose.connect(MON_URL,(err)=>{
        if(!err){
            console.log("Connection is sucessful");
        }
        else{
            console.log(err);
        }
    })
 }

module.exports = getConnetion;