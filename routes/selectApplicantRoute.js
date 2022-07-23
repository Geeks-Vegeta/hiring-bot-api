// creating routes for select applicant
const selectApplicantRoute = require('express').Router();


// import db connection from db
const connection = require('../db/connection');


// importing requiredAuth
const requiredAuth = require("../middleware/auth");


selectApplicantRoute.get("/", requiredAuth, async(req, res)=>{
    
    let conn;

    try {

        conn = await connection.getConnection();
        const column = await conn.query(`SELECT * FROM Applicants WHERE status='select';`);
    
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
selectApplicantRoute.put("/:phone_number", requiredAuth, async(req, res)=>{
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

        is_select = result[0]['status']
        console.log(is_select)
         
        // checking if applicant is select or not
        if(is_select == "select"){
            return res.json({"message": "The applicant is already select"})
        }

        await conn.query(`UPDATE Applicants SET status='select' WHERE phone=${phone_number};`);
        res.json({"message": "Applicant is now select"}).status(200);
        
    } catch (error) {
        console.log(error)
        
    }
    finally{
        if(conn) conn.end(); //close conn
    }
})


module.exports=selectApplicantRoute;