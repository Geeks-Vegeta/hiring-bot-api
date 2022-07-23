// import express 
const downResumeRoute = require('express').Router();

// importing aws
const AWS = require('aws-sdk');

// import db connection from db
const connection = require('../db/connection');


// for getting variable from .env file
const dotenv = require('dotenv');

// importing tiny url
const tinyurl = require('tinyurl');



// importing requiredAuth
const requiredAuth = require("../middleware/auth");


// dotenv config
dotenv.config();




AWS.config.update({ 
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION,
    signatureVersion: 'v4'
});



downResumeRoute.get("/:phone_number", requiredAuth, async(req,res)=>{

    const s3 = new AWS.S3()
    const myBucket = process.env.AWS_S3_BUCKET;
    const signedUrlExpireSeconds = 60 * 5;

    const phone_number = req.params.phone_number;

    let conn;

    try {
        

        conn = await connection.getConnection();
        const column = await conn.query(`SELECT resume_link FROM Applicants WHERE phone=?;`,[phone_number]);

        if(column.length == 0){
            return res.status(404).json({"message": "no row found"})
        }
        const mykey = column[0]['resume_link']
       

        const url = s3.getSignedUrl('getObject', {
            Bucket: myBucket,
            Key: mykey,
            Expires: signedUrlExpireSeconds
        });

        shortUrl = await tinyurl.shorten(url);

        res.send(shortUrl);
        
    } catch (error) {
        console.log(error)
        
    }

})

module.exports=downResumeRoute;