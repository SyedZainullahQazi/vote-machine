const express = require('express');

const authMiddleware = require("../../middlewares/auth/authMiddleware");
const GetHalkaCandidates=require("../../controllers/general/vote/GetHalkaCandidates");
const Vote=require("../../controllers/general/vote/Vote");
const router = express.Router();

router.post('/get-halka-candidates',authMiddleware,GetHalkaCandidates);
router.post('/vote',authMiddleware,Vote);

module.exports = router;



