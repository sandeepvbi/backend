const express= require('express');
const { sendEmail,register, loginUser ,adminRegister} = require('../controllers/auth_controller');

const router= express.Router();

router.post('/register',register)
router.post('/login',loginUser)
router.post('/register-admin',adminRegister)
router.post('/forgot',sendEmail);

module.exports= router;