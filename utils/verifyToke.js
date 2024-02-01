const jwt = require('jsonwebtoken');
const { CreateError } = require('./error');

 const verifyToken = async(req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token)
    return next(CreateError(404,"You are not authenicated"));
    jwt.verify(token,process.env.JWT_SCREATE, (err,decode)=>{
        if(err){
            return next(CreateError(403,"Token Is Invalid"))
        }else{
            req.user = decode;
        }
        next();
    });
};
 const verifyUser = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.decode === req.params.id){
            next();
        }else{
            return next(CreateError(403, "Your Not Autherized"))
        }
    });
};
 const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user){
            next();
        }else{
            return next(CreateError(403, "Your Not Autherized"))
        }
    });
};
module.exports ={
    verifyToken,
    verifyAdmin,
    verifyUser
}

