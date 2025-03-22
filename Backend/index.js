require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const cookieParser =require('cookie-parser');


// router import
const schoolRouter=require("./routes/schoolRouter");




const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const corsOption = {exposedHeaders:"Authorization"}
app.use(cors(corsOption));
app.use(cookieParser());

// Connect to database
mongoose.connect('mongodb://localhost:27017/schoolManagement').then(db=>{
    console.log("Mongodb connected")
}).catch(e=>{
    console.log("Monogodb error",e)
})

// router
app.use("/api/school", schoolRouter)



const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("Server is Running at",PORT)
})