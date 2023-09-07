const express = require('express');
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const UpdateCandidate=require("../../controllers/user/update-candidate");
const upload=require("../../helpers/multerHelper");

const router = express.Router();

router.put('/update-candidate',authMiddleware,upload.single('image'),UpdateCandidate);

module.exports = router;



