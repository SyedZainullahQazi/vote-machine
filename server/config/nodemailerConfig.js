const nodemailer=require("nodemailer");
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cashingp4@gmail.com',
      pass: 'liicwnjpctftsfib'
    }
  });

module.exports=transporter;