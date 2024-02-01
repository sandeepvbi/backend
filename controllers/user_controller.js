const { CreateSuccess } = require("../utils/success");
const User = require('../models/auth');
const { CreateError } = require("../utils/error");

const getAllUsers =async(req,res,next)=>{
     try {
        const users = await User.find();
        return next(CreateSuccess(200,"All user",users))
     } catch (error) {
        return next(CreateError(500,"Internal Server Error"))
     }
}
const getById =async(req,res,next)=>{
   try {
      const user = await User.findById(req.params.id);
      if(!user)
        return next(CreateError(404,"user Not found"));
        return next(CreateSuccess(200,"single user",user));
   } catch (error) {
    return next(CreateError(500,"Internal Server Error"))
   }
}

module.exports={
    getAllUsers,
    getById
}