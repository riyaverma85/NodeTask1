// const userModel = require("../models/userModel");

// const Login = async (req,res)=>{
//    console.log(req.body);

//    const {email, password} = req.body;

//    const user = await userModel.findOne({ email });

//    if(!user){
//     return res.status(400).send({msg: "Invalid email"})
//    }

//    if(user.password !== password){
//     return res.status(400).send({msg: "Invalid password"})
//    }

//    res.status(200).send({user, msg: "User successfully Login"});
// }

// module.exports = {
//     Login,
// }





const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
}, { collection: 'admin' }); // Force the singular table name 'admin'

module.exports = mongoose.model("admin", adminSchema);