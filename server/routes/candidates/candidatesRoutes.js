const express = require('express');
const candidateAuthMiddleware = require('../../middlewares/auth/candidateAuthMiddleware');
const GetVotersInHalka=require("../../controllers/candidate/GetVotersInHalka");
const router = express.Router();

router.post("/get-voters-in-halka",candidateAuthMiddleware,GetVotersInHalka);

module.exports = router;



