// importing express routing
const positionTypeRoute = require('express').Router();

// import db connection from db
const connection = require('../db/connection');


// importing requiredAuth
const requiredAuth = require("../middleware/auth");

positionTypeRoute.get("/", requiredAuth, async(req, res)=>{

    let conn;
    const type = req.query.type;
    console.log(typeof(type))

    try {

        conn = await connection.getConnection();
        const column = await conn.query(`SELECT * from Applicants WHERE position_type=?;`,[type]);
    
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

module.exports=positionTypeRoute;