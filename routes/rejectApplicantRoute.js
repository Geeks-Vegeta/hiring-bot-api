// creating routes for reject applicant
const rejectApplicantRoute = require('express').Router();


// importing requiredAuth
const requiredAuth = require("../middleware/auth");


// import db connection from db
const connection = require('../db/connection');

rejectApplicantRoute.get("/", requiredAuth, async(req, res)=>{
    
    let conn;

    try {

        conn = await connection.getConnection();
        const column = await conn.query(`SELECT * FROM Applicants WHERE status='reject';`);
    
        if(column.length == 0){
            return res.status(404).json({"message": "no row found"})
        }
        res.send(column).status(200);
        
    } catch (error) {
        console.log(error)
    }
    finally {
        if (conn) conn.end(); //release to conn
      }
})




// updating user using phone number
rejectApplicantRoute.put("/:phone_number",requiredAuth, async(req, res)=>{
    phone_number = req.params.phone_number
    
    let conn;

    try {
        conn = await connection.getConnection();

        // checking if user is already select or not
        const result = await conn.query(`SELECT status FROM Applicants WHERE phone=${phone_number};`);
        
        // checking if result is empty
        if(result.length == 0){
            return res.json({"message": "No such applicant exists"}).status(404);
        }

        is_reject = result[0]['status']
        console.log(is_reject)
         
        // checking if applicant is reject or not
        if(is_reject == "reject"){
            return res.json({"message": "The applicant is already reject"})
        }

        await conn.query(`UPDATE Applicants SET status='reject' WHERE phone=${phone_number};`);
        res.json({"message": "Applicant is now reject"}).status(200);

        
    } catch (error) {
        console.log(error)
        
    }
    finally{
        if(conn) conn.end(); //close conn
    }
})


module.exports=rejectApplicantRoute;