const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express(); //local server 
const taskRoute = require("./routes/tasks.js")
require("dotenv").config()
const connectDB = require("./db/connect.js")

const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.static("./public"))




// setting rotine 
app.use("/api/v1/tasks", taskRoute)

//connecting with database
const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URL2 || process.env.MONGO_URL);
        app.listen(PORT, console.log("server is running...!"));
    } catch (err) {
        console.log(err)
    }
};

start()


