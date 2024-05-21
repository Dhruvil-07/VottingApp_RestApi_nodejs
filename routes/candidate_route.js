const express = require('express');
const router = express.Router();
const auth_service = require('../auth_service/jwt_auth');
const candidateController = require('../controllers/candidate_controller');

//show candidate routes
router.route('/')
      .get(auth_service.jwtauthmiddelwware,candidateController.show_candidate);


//candidate resgister route
router.route('/resgister')
      .post(auth_service.jwtauthmiddelwware,candidateController.reg_candidate);


//candidate update
router.route('/update/:cid')
      .put(auth_service.jwtauthmiddelwware,candidateController.update_candidate);

      
module.exports = router;