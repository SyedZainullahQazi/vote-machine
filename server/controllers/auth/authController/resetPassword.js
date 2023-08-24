const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');

const User = require('../../../models/users/user');
const transporter=require("../../../config/nodemailerConfig");

const JWT_SECRET = process.env.JWT_SECRET||"sajjadbhai"; 
  
const ResetPasswordSend=async (req,res)=>{
    const { cnic } = req.body;
    try 
    {
        const existingUser = await User.findOne({ cnic });
        if (existingUser) 
        {
            const resetToken = jwt.sign({ cnic, action: 'reset' }, JWT_SECRET, { expiresIn: '1h' });

            const resetLink = `${process.env.CORS_ORIGIN}reset-password/${resetToken}`;
            const mailOptions = {
                from: 'cashingp4@gmail.com',
                to:existingUser.email,
                subject: 'Password Reset',
                text: `Click the following link to reset your password: ${resetLink}`
              };
              await transporter.sendMail(mailOptions);
              console.log("Password Link Sent");
              res.json({ message: 'Password reset link sent to your email' });
        }
        else
        {
            return res.status(400).json({ message: 'Invalid CNIC - No Such User' });
        }
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };

const ResetPassword=async (req,res)=>{
    const {token}=req.params;
    const {password}=req.body;
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);


    try {
        let cnic=decodedToken.cnic;
        const result = await User.updateOne({cnic},{ $set: { password:hashedPassword } });
        if (result.modifiedCount > 0) {
            res.status(200).json({message: "Password Updated : Success"});
        }
        else {
            res.status(201).json({message:"Password Not Updated"});
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ error: 'An error occurred' });
    }

}

  module.exports={
    ResetPasswordSend,
    ResetPassword
  }