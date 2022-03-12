const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.get('/getAllUsers',  UserController.getAllUsers)

module.exports = router