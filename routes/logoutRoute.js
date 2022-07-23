// importing express router
const logoutRoute = require('express').Router();


logoutRoute.get("/", (req, res)=>{
    try {
        res.clearCookie("Authorization",{path:"/"});
        res.status(200).json({"message": "User logout successfully"})
        
    } catch (error) {
        console.log(error)
        
    }
})



module.exports=logoutRoute;



