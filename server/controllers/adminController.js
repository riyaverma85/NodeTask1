const AdminModel = require("../models/adminModel");
const randomPass = require("../middleware/randomPassword");
const userModel = require("../models/userModel");
const taskModel = require("../models/taskModel");
const nodemailer = require("nodemailer");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log("------------------- AUTH DIAGNOSTIC -------------------");
        console.log("Searching in DB:", require('mongoose').connection.name);
        console.log("Login Request for:", email);

        // Escape email for safe regex and use case-insensitive
        const escapedEmail = email.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const emailRegex = new RegExp("^" + escapedEmail + "$", "i");
        
        // Comprehensive Multi-Field Search
        const admin = await AdminModel.findOne({ 
            $or: [
                { email: emailRegex },
                { Email: emailRegex },
                { adminEmail: emailRegex },
                { user_email: emailRegex },
                { userName: emailRegex },
                { username: emailRegex }
            ]
        });

        if (!admin) {
            const sampleDoc = await AdminModel.findOne({}).lean();
            console.log("❌ CRITICAL: No match found for", email);
            console.log("DB Content Structure Found:", sampleDoc ? Object.keys(sampleDoc) : "COLLECTION IS EMPTY!");
            return res.status(400).send({ status: "fail", message: "Invalid email or Account not detected ❌" });
        }

        console.log("✅ Admin Node Identified in DB.");
        
        // Dynamic Password Detection
        const foundPassword = admin.password || admin.Password || admin.pass || admin.userPassword || admin.adminPassword;
        
        if (!foundPassword || foundPassword.toString().trim() !== password.trim()) {
            console.log("❌ Authentication Failure: Password mismatch or key not found.");
            console.log("Keys available in record:", Object.keys(admin));
            return res.status(400).send({ status: "fail", message: "Invalid password ❌" });
        }

        console.log("🎉 Login Successful!");
        res.status(200).send({ 
            status: "success", 
            message: "Admin successfully logged in ✅", 
            admin 
        });
    } catch (error) {
        console.error("Critical Login Error:", error);
        res.status(500).send({ status: "error", message: "Internal Server Error" });
    }
}


const createUser = async (req, res) => {
  console.log("Starting User Creation Process - Data:", req.body);
  try {
    const { name, email, post } = req.body;

    if (!name || !email || !post) {
      return res.status(400).send({ status: "fail", message: "All fields are required (name, email, post) ❌" });
    }

    // Check if user already exists (Manual check since no unique index)
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
        return res.status(400).send({ status: "fail", message: "A user with this email already exists ⚠️" });
    }

    let userPassword = randomPass.randomPassword();

    // 1. Create user in DB FIRST
    const newUser = await userModel.create({
      name: name,
      email: email,
      post: post,
      password: userPassword
    });

    console.log("✅ User created in DB with ID:", newUser._id);

    // 2. Setup Email Transporter
    try {
      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODE_MAIL,
          pass: process.env.NODE_PASS,
        },
      });

      let mailDetails = {
        from: `"TaskPulse Support" <${process.env.NODE_MAIL}>`,
        to: email,
        subject: "Welcome to TaskPulse - Your Account is Ready! 🚀",
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #f1f5f9; border-radius: 12px; max-width: 500px; margin: auto;">
            <h2 style="color: #6366F1;">Hello ${name}! 👋</h2>
            <p style="color: #64748B;">Your professional account has been successully initialized on <b>TaskPulse</b>.</p>
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 5px 0;"><b>Access Email:</b> ${email}</p>
                <p style="margin: 5px 0;"><b>Temporary Password:</b> <span style="color: #6366F1; font-weight: bold;">${userPassword}</span></p>
            </div>
            <p style="font-size: 11px; color: #94a3b8;">This is an automated operational broadcast. Please do not reply.</p>
          </div>
        `,
      };

      await mailTransporter.sendMail(mailDetails);
      console.log("📧 Credentials successfully dispatched to:", email);

    } catch (mailError) {
      console.error("⚠️ Email Dispatch Failed but User was Created:", mailError.message);
      // We don't fail the whole request because the user IS actually created in the DB
    }

    res.status(200).send({
      status: "success",
      message: "User created successfully! ✅",
      user: newUser
    });

  } catch (error) {
    console.error("🔥 Critical Core Error in CreateUser:", error);
    res.status(500).send({
      status: "error",
      message: "Internal core failure during user creation",
      error: error.message
    });
  }
};

const adminUserDisplay = async (req, res) => {
     let users = await userModel.find();
     res.send(users);
}

const assignTask = async (req, res) => {
  console.log("Assigning task with data:", req.body);
  try {
    const { task, days, id } = req.body; // Changed userId to id to match frontend

    if (!task || !days || !id) {
      return res.status(400).send({ msg: "Missing fields (task, days, or id)" });
    }

    await taskModel.create({
      task: task,
      days: days,
      userId: id
    });

    res.status(200).send({ msg: "Task assigned successfully ✅" });
  } catch (error) {
    console.error("Task Assignment Error:", error);
    res.status(500).send({ msg: "Failed to assign task", error: error.message });
  }
}

const getDashboardStats = async (req, res) => {
  try {
    const totalTasks = await taskModel.countDocuments();
    const completedTasks = await taskModel.countDocuments({ status: "Completed" });
    const pendingTasks = await taskModel.countDocuments({ status: "Pending" });
    const inProgressTasks = await taskModel.countDocuments({ status: "In Progress" });
    const totalUsers = await userModel.countDocuments();

    // Logic for overdue: (status != Completed AND current date > createdAt + days)
    // For simplicity, let's just count manually or use a more complex aggregation
    // For now, I'll count tasks that are not completed and have been created too long ago.
    
    const tasks = await taskModel.find({ status: { $ne: "Completed" } });
    const now = new Date();
    const overdueTasks = tasks.filter(task => {
      const createdDate = new Date(task.createdAt);
      const dueDate = new Date(createdDate.getTime() + task.days * 24 * 60 * 60 * 1000);
      return now > dueDate;
    }).length;

    res.status(200).send({
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      totalUsers,
      overdueTasks
    });
  } catch (error) {
    res.status(500).send({ msg: "Error fetching stats", error: error.message });
  }
}

module.exports = {
    login,
    createUser,
    adminUserDisplay,
    assignTask,
    getDashboardStats
}