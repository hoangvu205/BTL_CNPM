const mysql = require('mysql2/promise');

const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'movie_booking'
});

console.log("db connected");

module.exports = {conn};