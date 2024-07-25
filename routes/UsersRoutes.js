
const express = require('express')
const usersController = require('../controllers/UserController')


const usersRouter = express.Router();


usersRouter.route('/')
.get(usersController.getUsers)

usersRouter.route('/signup')
.post(usersController.addUsers)

usersRouter.route('/login')
.post(usersController.verifyUsers)

usersRouter.route('/update')
.post(usersController.updateUsers)


module.exports = usersRouter