const Role = require('../models/Roles');
const User = require('../models/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const { CreateError } = require('../utils/error.js');
const { CreateSuccess } = require('../utils/success.js');
const role = require('../models/Roles');
const UserToken = require('../models/UserToken.js')

const register =async(req,res,next)=>{
  const role = await Role.find({role:'User'});
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    userName:req.body.userName,
    email:req.body.email,
    password:hashedPassword,
    roles:role
  });
  await newUser.save();
//   return res.status(201).send({message:"User Created",resp})
return next(CreateSuccess(200,"user register sucessfully"))
}

const loginUser = async(req,res,next)=>{
    try {
        // const { email, password } = req.body;
        const user = await User.findOne({email:req.body.email})
        .populate("roles","role")
        const{roles} = user
        if(!user){
            return res.status(404).send({message:'User Not Found'});
        }
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if(!passwordMatch){
            return res.status(404).send({message:'password Incorrect'});
        }
        const token = jwt.sign(
            {id:user.id,isAdmin:user.isAdmin,roles:roles},
            process.env.JWT_SCREATE
        )
        res.cookie("access-token",token,{httpOnly:true})
        .status(200)
        .json(
            {
                status:200,
                message:"login Successfully",
                data:user
            }
        )
    } catch (error) {
        return res.status(500).send('internal server Error')
    }
}


const adminRegister = async (req,res,next)=>{
    const role = await Role.find({});
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    userName:req.body.userName,
    email:req.body.email,
    password:hashedPassword,
    isAdmin:true,
    roles:role
  });
  await newUser.save();
//   return res.status(201).send({message:"User Created",resp})
return next(CreateSuccess(200,"user Admin register  sucessfully"))
}

// const updateUser =async(req,res)=>{
//     try {
//         const {username,email,password}=req.body;
//         if(!username || !email || !password){
//             return res.status(400).send({message:"All the fields are mandatory"})
//         }
//         let user=await User.findOne({email});
//         if(user){
//             return res.send({message:"email is already registered"})
//         }
//         user=await User.findOne({password});
//         if(user){
//             return res.send({message:"password is already registered"})
//         }
//         const newUser= new User({username,email,password});
//         const resp= await newUser.save();
//         res.status(201).send({message:"User Created",resp})
//     } catch (error) {
//         console.log(error);
//     }

// }


const sendEmail = async(req, res,next)=>{
    const email =req.body.email;
    const user = await User.findOne({email:{$regex:'^'+email+'$',$options:'i'}});
    if(!user){
        return next(CreateError(404,"user Not Found to reset the email! "))
    }
    const payload ={
        email:user.email
    }   
    const expireTime = 600;
    const token = jwt.sign(payload,process.env.JWT_SCREATE,{expiresIn:expireTime});
    const newToken = UserToken({
        userId:user.id,
        token:token
    });
    console.log("token",token);
    const  smtpTransport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"psandeep.passionate@gmail.com",
            pass:"atlgnmlxwsjodzpj"
        },

    });
    console.log("gdtghcjydytgctrtrctr",smtpTransport)

    const mailDetails = {
        from:"",
        to:email,
        subject:"Reset the Password!",
        html:`
        <head>
        <title>Password Reset Requiest</title>
    </head>
    <body>
        <h1>Password Reset Requiest</h1>
        <p>Dear ${user.userName},</p>
        <p>we have received a password Reset requiest please click the button</p>
        <a href=${process.env.LIVE_URL}/reset/${token}>
        <button style="background-color: 04CAF50; color: white; padding: 14px 20px; border: none; 
        cursor: pointer;border-radius:4px">Reset Password</button>
        </a>
        <p>Please note that this link only 5min </p>
        <p>Thank you</p>
        <p>P. Sandeep</p>
    </body>
    </html> `
    }
    smtpTransport.sendMail(mailDetails,async(err,data)=>{
        if(err){
            console.log('Error sending email:',err)
            return next(CreateError(500,'something went wrong'))
        }else{
            await newToken.save();
            return next(CreateSuccess(200,'Email send successfully'))
        }
        
    })
}
const deleteUser =async(req,res)=>{

}
module.exports={
    register,
    loginUser,
    adminRegister,
    sendEmail
}