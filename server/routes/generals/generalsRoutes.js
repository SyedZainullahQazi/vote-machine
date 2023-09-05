const express = require('express');

const authMiddleware = require("../../middlewares/auth/authMiddleware");
const {GetUserDetails,GetUserDetailsForInvite}= require("../../controllers/general/GetUserDetails");
const GetClosestSchedule=require("../../controllers/general/GetClosestSchedule");
const GetCandidateResultDetails=require("../../controllers/general/results/CandidateResultDetails");
const router = express.Router();

router.post('/user-details',authMiddleware,GetUserDetails);
router.get('/user-details/for-invite',authMiddleware,GetUserDetailsForInvite);
router.get('/closest-schedule',GetClosestSchedule);
router.post('/candidate-result-details',authMiddleware,GetCandidateResultDetails);

module.exports = router;



