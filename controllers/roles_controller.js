const Role = require('../models/Roles');
const newRole =async(req,res)=>{
    try {
        if(req.body.role && req.body.role !=""){
            // const newUser= new User({email,password});
            const newRole = new Role(req.body)
            await newRole.save();
           return res.send("roles was created") 
        } else{
            return res.status(400).send('Bad requsest')
        }
       } catch (error) {
        return res.status(500).send('internal server Error')
       }
}

const updateRole =async(req,res)=>{
   try {
    const updaterole = await Role.findById({_id:req.params.id});
    if(updaterole){
        const newData = await Role.findByIdAndUpdate(
            req.params.id,
            {$set:req.body._id},
            {upsert:true}
        );
        return res.status(200).send("role is updated");
    }else{
        return res.status(404).send('role is not fount')
    }
   } catch (error) {
    return res.status(500).send('internal server Error')
   }
}

const getAllRoles = async(req,res,next)=>{
  try {
    const roles = await Role.find();
    return res.status(200).send(roles);
  } catch (error) {
    return res.status(500).send('internal server Error')
  }
}

const deleteRoles =async(req,res,next)=>{
    try {
       const roleId = req.params.id;
       const deleteRole = await role.findById({_id:roleId});
       if(deleteRole){
        await role.findByIdAndDelete(roleId);
        return res.status(200).send('role deleted');
       }else{
        return res.status(400).send('role not deleted')
       }
    } catch (error) {
        return res.status(500).send('internal server Error');
    }
}

module.exports={
    newRole,
    updateRole,
    getAllRoles,
    deleteRoles
}