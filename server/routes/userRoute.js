// const express=require("express");
// const route=express.Router();
// const userController=require("../controllers/userController")
// route.post("/userlogin",userController.userlogin)

// module.exports=route;





const express = require("express");

const route = express.Router();

const userController = require("../controllers/userController");


route.get("/getprofile/:userId", userController.getUserProfile);
route.post("/login",userController.userlogin );
route.get("/getalltasks/:userId", userController.getUserTasks); // API call for user tasks


module.exports = route;