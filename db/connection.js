// importing mariadb
const mariadb = require('mariadb');

// importing dotenv
const dotenv = require('dotenv');

// configuring dotenv
dotenv.config();

// creating a pool
const connection = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DBPORT,
    connectionLimit: 100,
});



//from ltt_reference_files
module.exports = connection;