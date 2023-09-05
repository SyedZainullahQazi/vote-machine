const express = require('express');
const router = express.Router();

const authMiddleware =require("../../middlewares/auth/authMiddleware");

// router.get('/get',authMiddleware,GetCandidatesApplications);

module.exports = router;
