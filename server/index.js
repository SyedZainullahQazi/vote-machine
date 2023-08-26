const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectToDatabase = require("./db/db.js");
const authRoutes = require("./routes/auth/authRoutes.js");
const generalRoutes=require("./routes/generals/generalsRoutes.js");
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5001;


connectToDatabase();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes); 
app.use('/api/generals',generalRoutes);

app.use(bodyParser.json());

app.listen(port, () => {
    console.log("Server is running on port: " + port);
});
