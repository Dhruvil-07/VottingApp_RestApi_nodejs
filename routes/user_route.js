const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user_controllers');
const auth_service = require('../auth_service/jwt_auth');

//signup route
router.route('/signup')
      .post(UserController.user_signup);

//login route
router.route('/login')
      .post(UserController.user_login);

//profile check route
router.route('/profile')
      .get(auth_service.jwtauthmiddelwware,UserController.get_profile);

module.exports = router;