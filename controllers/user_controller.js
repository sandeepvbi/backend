const roles = require('../models/Roles');
const User = require('../models/User');
const sendEmail = async(req, res,next)=>{
    const email =req.body.email;
    const user = await userToken.findOne({email:{$regex:'^'+email+'$',$options:'i'}});
    if(!user){
        return res.status(400).send({message:"user not found reset password"})
    }
}
const register =async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).send({message:"All the fields are mandatory"})
        }
        let user=await User.findOne({email});
        if(user){
            return res.send({message:"email is already registered"})
        }
        user=await User.findOne({password});
        if(user){
            return res.send({message:"password is already registered"})
        }
        const newUser= new User({email,password});
        const resp= await newUser.save();
        res.status(201).send({message:"User Created",status:200,resp})
    } catch (error) {
        console.log(error);
    }

}
const getAllUsers =async(req,res)=>{

}
const getUserById =async(req,res)=>{

}
const updateUser =async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        if(!username || !email || !password){
            return res.status(400).send({message:"All the fields are mandatory"})
        }
        let user=await User.findOne({email});
        if(user){
            return res.send({message:"email is already registered"})
        }
        user=await User.findOne({password});
        if(user){
            return res.send({message:"password is already registered"})
        }
        const newUser= new User({username,email,password});
        const resp= await newUser.save();
        res.status(201).send({message:"User Created",resp})
    } catch (error) {
        console.log(error);
    }

}
const deleteUser =async(req,res)=>{

}
module.exports={
    sendEmail,
    register,
    updateUser
}