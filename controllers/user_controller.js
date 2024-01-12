const Usermodel = require('../models/user_models')
const addUser =async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).send({message:"All the fields are mandatory"})
        }
        let user=await Usermodel.findOne({email});
        if(user){
            return res.send({message:"email is already registered"})
        }
        user=await Usermodel.findOne({password});
        if(user){
            return res.send({message:"password is already registered"})
        }
        const newUser= new Usermodel({email,password});
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
        let user=await Usermodel.findOne({email});
        if(user){
            return res.send({message:"email is already registered"})
        }
        user=await Usermodel.findOne({password});
        if(user){
            return res.send({message:"password is already registered"})
        }
        const newUser= new Usermodel({username,email,password});
        const resp= await newUser.save();
        res.status(201).send({message:"User Created",resp})
    } catch (error) {
        console.log(error);
    }

}
const deleteUser =async(req,res)=>{

}

module.exports={
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}