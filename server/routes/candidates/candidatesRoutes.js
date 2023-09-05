const express = require('express');
const authMiddleware = require('../../middlewares/auth/authMiddleware');
const GetVotersInHalka=require("../../controllers/candidate/GetVotersInHalka");
const router = express.Router();

router.post("/get-voters-in-halka",authMiddleware,GetVotersInHalka);

module.exports = router;



