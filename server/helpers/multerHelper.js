const multer=require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..','..','client','public', 'uploads'));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExtension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    },
  });
  
  const upload = multer({ storage: storage });

  module.exports=upload;