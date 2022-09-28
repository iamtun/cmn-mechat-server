const express = require('express');
const Router = express.Router();
const UserController = require('../controllers/userController');
const AuthController = require('../controllers/authController');

Router.post('/login', AuthController.login);
Router.post('/signup', AuthController.signup);


// router.use(authController.protect);
// router.use(authController.restrictTo('user'));

Router.get('/',UserController.getAllUsers);
Router.get('/get-user-by-phone/:phoneNumber',UserController.getUserByPhoneNumber);
Router
    .route('/:userID')
    .get(UserController.getUserByID)
    .patch(UserController.updateUser)
    .delete(UserController.deleteUser);

module.exports = Router;