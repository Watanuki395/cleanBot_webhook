require('dotenv').config();

const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    server: process.env.SQL_SERVER, 
    database: process.env.SQL_DB,
  };


  module.exports = config;