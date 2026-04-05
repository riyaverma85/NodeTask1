const UserModel = require("../models/userModel");
const TaskModel = require("../models/taskModel"); // Added TaskModel

const userlogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(400).send({ status: "fail", message: "Invalid Email ❌" });
        }

        if (user.password.trim() !== password.trim()) {
            return res.status(400).send({ status: "fail", message: "Invalid Password ❌" });
        }

        res.status(200).send({ 
            status: "success", 
            message: "User logged in successfully ✅", 
            user 
        });
    } catch (error) {
        console.error("User Login Error:", error);
        res.status(500).send({ status: "error", message: "Internal Server Error" });
    }
}

const getUserTasks = async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await TaskModel.find({ userId: userId });
        res.status(200).send(tasks);
    } catch (error) {
        console.error("Error fetching user tasks:", error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
}

const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await UserModel.findById(userId);
        if (!user) return res.status(404).send({ msg: "User not found" });
        res.status(200).send(user);
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
}

module.exports = {
    userlogin,
    getUserTasks,
    getUserProfile
}