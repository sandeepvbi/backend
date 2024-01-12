const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema= new Schema({
     name:{
         type:String,
         require:false
     },
     email:{
         type:String,
         required:true
     },
     username:{
         type:String,
         require:false
     },
     password:{
         type:String,
         required:true
     }
 },{timestamps:true});
 
 const UserModel= mongoose.model('UserModel',userSchema);
 module.exports= UserModel;
