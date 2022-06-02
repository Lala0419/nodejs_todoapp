const express = require("express");
const app = express(); //local server 
const taskRoute = require("./routes/tasks")
const connectDB = require("./db/connect")
require("dotenv").config()

app.use(express.json());
app.use(express.static("./public"))


const PORT = 5000;


// setting rotine 
app.use("/api/v1/tasks", taskRoute)

//connecting with database
const start = async()=>{
    try{
        await connectDB(process.env.MONGO_HEROKU_URL || process.env.MONGO_URL);
        app.listen(process.env.PORT || PORT, console.log("server is running...!"));
    } catch (err) {
        console.log(err)
    }
};

start()


