const mongoose = require('mongoose')
const userToken = mongoose.Schema;

const userTokenJwt = new userToken(
    {
        userId :{
            type:userToken.Types.ObjectId,
            require:true,
            ref:"user"
        },
        token :{
            type:String,
            require:true
        },
        createdAt :{
            type:Date,
            default:Date.now,
            expired:300
        },
    }
);

const userTokenr= mongoose.model('Token',userTokenJwt);
module.exports= userTokenr;
