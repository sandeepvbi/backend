const express = require('express');
const {newRole,updateRole,getAllRoles,deleteRoles} =require('../controllers/roles_controller')
const router= express.Router();

//Create a New Role In DB
router.post('/create', newRole);
router.put('/upadte/:id',updateRole);
router.get('/',getAllRoles);
router.delete('/delete/:id',deleteRoles)

module.exports= router;