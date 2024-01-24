const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
        firstName:{
            type:String,
            require:false
        },
        lastName:{
            type:String,
            require:false
        },
        userName:{
            type:String,
            require:false,
            unique:true
        },
        email:{
            type:String,
            require:true,
            unique:true
        },
        password:{
            type:String,
            require:true,
        },
        isAdmin:{
            type:Boolean,
            default:false,
        },
        // roles:{
        //     type:[Schema.Types.ObjectId],
        //     require:true,
        //     ref:'role'
        // }
        // will add role
    },{timestamps:true}
)
 const User= mongoose.model('User',UserSchema);
 module.exports= User;


// const userSchema= new Schema({
//      name:{
//          type:String,
//          require:false
//      },
//      email:{
//          type:String,
//          required:true
//      },
//      username:{
//          type:String,
//          require:false
//      },
//      password:{
//          type:String,
//          required:true
//      }
//  },{timestamps:true});
 
//  const UserModel= mongoose.model('UserModel',userSchema);
//  module.exports= UserModel;
//  export default mongoose.model("UserModel",userSchema)
