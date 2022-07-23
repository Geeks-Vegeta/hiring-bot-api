// importing loginRoute
const loginRoute = require('express').Router();


// import jsonwebtoken
const jwt = require('jsonwebtoken');



// import db connection from db
const connection = require('../db/connection');


loginRoute.post("/", async(req, res)=>{

    user_email = req.query.email;
    user_password = req.query.password;


    // checking if email exists or not
    try {
        conn = await connection.getConnection();

        // checking if email is exists or not
        is_email =await conn.query("select email, password from user where email=?",[user_email]);

        // checking if email exists or not
        if(is_email.length == 0){
            return res.json({"message": "Email does not exists"}).status(404);
        }

        // user email
        email = is_email[0]['email']


        // checking if password exists or not
        if(user_password != is_email[0]['password']){
            return res.json({"message": "Password does not exists"}).status(404);
        }

        // generating token
        const token = jwt.sign({"user":email}, process.env.SECRET_KEY);
        res.status(200).cookie('Authorization',`Bearer ${token}`).header('Authorization',`Bearer ${token}`).send(token);


       

        
    } catch (error) {
        console.log(error)
        
    }finally {
        if (conn) conn.end(); //release to conn
      }

})


module.exports = loginRoute;

