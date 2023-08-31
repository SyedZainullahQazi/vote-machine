const express = require('express');
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const InviteUserCont=require("../../controllers/admin/inviteUser/InviteUserController");

const router = express.Router();

router.put("/Invite",authMiddleware,InviteUserCont.InviteUser);

module.exports = router;



