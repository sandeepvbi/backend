const express = require('express');
const router = express.Router();
const {getAllUsers, getById} = require('../controllers/user_controller');
const {verifyAdmin, verifyUser} = require('../utils/verifyToke');

router.get('/',getAllUsers)

router.get('/:id',getById)

module.exports= router;