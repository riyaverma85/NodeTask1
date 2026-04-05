// const express=require("express")
// const app=express();
// const bodyParser = require("body-parser");
// require("dotenv").config();
// const cors=require("cors");
// const userRoute=require("./routes/userRoute")

// const mongoose=require("mongoose");

// mongoose.connect(process.env.MONGO_URL).then(()=>{
// console.log("DB succesfully connected!!!")

// })

// const Port=process.env.PORT;
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(cors());
// app.use("/user",userRoute);


// app.listen(Port,()=>{
// console.log(`server run on port ${Port}`)
// })








const express = require("express");

const app = express();

const cors = require("cors");

const mongoose = require("mongoose");

const bodyparser = require("body-parser");

const adminRoute = require("./routes/adminRoute");

const userRoute = require("./routes/userRoute");

require("dotenv").config();

const PORT = process.env.PORT;

app.use(cors());
app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended: true}));

app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB connection successful ✅");
}).catch(err => console.error("DB connection error ❌:", err));


app.listen(PORT, ()=>{
    console.log(`server are running in port ${PORT}`);
})