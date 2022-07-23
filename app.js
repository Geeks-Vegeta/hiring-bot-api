// importing express
const express = require('express');

// creating instance of express
const app = express()

// importing cors
const cors = require('cors');


// for getting variable from .env file
const dotenv = require('dotenv');


//importing cookie parser
const cookieParser = require('cookie-parser');


// auth middleware
const requiredAuth = require("./middleware/auth");


// importing routes
const activeApplicantRoute = require('./routes/activeApplicantRoute');
const reviewApplicantRoute = require('./routes/reviewApplicantRoute');
const selectApplicantRoute = require('./routes/selectApplicantRoute');
const rejectApplicantRoute = require('./routes/rejectApplicantRoute');
const shortlistApplicantRoute = require('./routes/shortlistApplicantRoute');
const onholdApplicantRoute = require('./routes/onholdApplicantRoute');
const appliedPostRoute = require('./routes/appliedPostRoute');
const positionTypeRoute = require('./routes/positionTypeRoute');
const appliedRoute = require('./routes/appliedRoute');
const applicantRoute = require('./routes/applicantRoute');
const applicantsRoute = require('./routes/applicantsRoute');
const downloadResumeRoute = require('./routes/downloadResumeRoute');
const loginRoute = require("./routes/loginRoute");
const logoutRoute = require("./routes/logoutRoute");







// dotenv config
dotenv.config();


// app middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// routes
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/active", activeApplicantRoute);
app.use("/review", reviewApplicantRoute);
app.use("/select", selectApplicantRoute);
app.use("/shortlist", shortlistApplicantRoute);
app.use("/onhold", onholdApplicantRoute)
app.use("/reject", rejectApplicantRoute);
app.use("/applied_post", appliedPostRoute);
app.use("/position_type", positionTypeRoute);
app.use("/applied", appliedRoute);
app.use("/applicant", applicantRoute);
app.use("/applicants", applicantsRoute);
app.use("/download", downloadResumeRoute);


// Server Activation
const port = process.env.PORT || 5000;


app.get("/", (req, res)=>{
    res.json({"message": "This is express Hiring Bot Api"})

})


app.listen(port, ()=>{
    console.log(`listening at port ${port}`);
})