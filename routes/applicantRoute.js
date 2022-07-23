// importing express routing
const applicantRoute = require('express').Router();

// import db connection from db
const connection = require('../db/connection');


// importing requiredAuth
const requiredAuth = require("../middleware/auth");


applicantRoute.get("/", requiredAuth, async(req, res)=>{

    let conn;
    const phone = req.query.phone;

    try {

        conn = await connection.getConnection();
        const column = await conn.query(`SELECT * FROM Applicants WHERE phone=?;`,[phone]);
    
        if(column.length == 0){
            return res.status(404).json({"message": "no such number exists"})
        }
        res.send(column).status(200);
        
    } catch (error) {
        console.log(error)
    }
    finally {
        if (conn) conn.end(); //release to conn
      }


})

module.exports=applicantRoute;