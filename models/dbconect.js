const mongoose= require('mongoose');
const dotenv= require('dotenv');
dotenv.config();

mongoose.connect(process.env.urlpath)
.then(()=>console.log("Connected.....!!!"))
.catch((error)=>console.log("Error i Connection",error))