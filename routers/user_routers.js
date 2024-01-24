const express= require('express');
const { sendEmail,register, updateUser} = require('../controllers/user_controller');

const router= express.Router();

router.post('/send-mail',sendEmail);
router.post('/',register)
router.post('/',updateUser)

module.exports= router;