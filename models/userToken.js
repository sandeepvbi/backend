const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            require:true,
            ref:"User"
        },
        token:{
            type:String,
            require:true
        },
        createdAt:{
            type:Date,
            default:Date.now,
            expires :300
        }
    }
);
const UserToken = mongoose.model('Token',TokenSchema);
module.exports=UserToken;
