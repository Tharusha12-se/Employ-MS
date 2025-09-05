import mysql from 'mysql';

const conn =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"employeems"
});

conn.connect(function(err){
    if(err){
        console.log("Connection Failed");
    }else{
        console.log("Connected to database");
    }
} )

export default conn;