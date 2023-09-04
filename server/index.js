const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./db/db.js");
const dotenv = require("dotenv").config();
require("./config/electionScheduler");

const authRoutes = require("./routes/auth/authRoutes.js");
const generalRoutes=require("./routes/generals/generalsRoutes.js");
const adminHalkaRoutes=require("./routes/admin/adminHalkaRoutes.js");
const InviteUserRoutes=require("./routes/admin/InviteUserRoutes.js");
const ScheduleElection=require("./routes/admin/adminScheduleRoutes.js");
const userRoutes=require("./routes/user/userRoutes.js");
const GetCandidatesApplications=require("./routes/admin/candidateApplicationRoutes.js");
const voteRoutes=require('./routes/generals/voteRoutes.js');
const candidateRoutes=require("./routes/candidates/candidatesRoutes.js");

const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5001;

connectToDatabase();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes); 
app.use('/api/generals',generalRoutes);
app.use('/api/generals/vote',voteRoutes);

app.use('/api/admin/halka',adminHalkaRoutes);
app.use('/api/admin/InviteUser',InviteUserRoutes);
app.use('/api/admin/schedule-elections',ScheduleElection);
app.use('/api/admin/candidate-application',GetCandidatesApplications);

app.use('/api/user',userRoutes);
app.use('/api/candidate',candidateRoutes);

app.use(bodyParser.json());

app.listen(port, () => {
    console.log("Server is running on port: " + port);
});
