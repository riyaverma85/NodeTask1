const express = require("express");

const route = express.Router();

const adminController = require("../controllers/adminController");

route.post("/login", adminController.login);
route.post("/createuser", adminController.createUser);
route.get("/getuser", adminController.adminUserDisplay); // Matched with frontend
route.post("/assigntask", adminController.assignTask);
route.get("/stats", adminController.getDashboardStats); // Matched with frontend stats call


module.exports = route;