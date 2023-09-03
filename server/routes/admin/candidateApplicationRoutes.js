const express = require('express');
const router = express.Router();

const ApprovedCandidate=require('../../controllers/admin/candidateApplications/ApprovedCandidate');
const authMiddleware =require("../../middlewares/auth/authMiddleware");
const GetCandidatesApplications=require("../../controllers/admin/candidateApplications/GetCandidatesApplication");
const RejectCandidate=require("../../controllers/admin/candidateApplications/RejectCandidate");

router.get('/get',authMiddleware,GetCandidatesApplications);
router.put('/approved',authMiddleware,ApprovedCandidate);
router.put('/reject',authMiddleware,RejectCandidate);

module.exports = router;
