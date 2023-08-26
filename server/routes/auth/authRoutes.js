const express = require('express');

const signupController = require('../../controllers/auth/signupController');
const loginController=require('../../controllers/auth/loginController');
const upload=require("../../helpers/multerHelper");
const passport=require("../../helpers/authPassport");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const Dashboard  = require('../../controllers/auth/dashboard');
const forgetPassword=require("../../controllers/auth/authController/resetPassword");
const router = express.Router();

router.post('/signup', upload.single('image'),signupController.addUser);
router.post('/login',loginController.checkLogin)
router.get("/dashboard",authMiddleware,Dashboard.dashboard);
router.post("/reset-password",forgetPassword.ResetPasswordSend);
router.post("/reset-password/new-password",forgetPassword.ResetPassword);


router.get('/verify', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.json({ message: 'Token verified' });
});


module.exports = router;



