const express = require('express');
const router = express.Router();
const auth_service = require('../auth_service/jwt_auth');
const votecontroller = require('../controllers/votting_controller');

//votting route
router.route('/:cid')
      .put(auth_service.jwtauthmiddelwware,votecontroller.vote);


//polling route
router.route('/poll')
      .get(auth_service.jwtauthmiddelwware,votecontroller.voteCount);

module.exports = router;