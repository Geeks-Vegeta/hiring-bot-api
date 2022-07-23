// importing express routing
const appliedPostRoute = require('express').Router();

// import db connection from db
const connection = require('../db/connection');



// importing requiredAuth
const requiredAuth = require("../middleware/auth");


appliedPostRoute.get("/",requiredAuth, async(req, res)=>{

    let conn;
    const post_query = req.query.post;

    try {

        conn = await connection.getConnection();
        const column = await conn.query(`select * from Applicants where applied_post=?;`,[post_query]);
    
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

module.exports=appliedPostRoute;