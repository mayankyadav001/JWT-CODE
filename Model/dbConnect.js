const mysql = require('mysql');
let con = mysql.createConnection({
    user: "root",
    password:"",
    host: "localhost",
    port: 3306,
 database: "jwt"
})

con.connect((err,res)=>{
    if(err){
        console.log(err.sqlMessage)
    }else {
      console.log('server connected')
    }
})
module.exports = con;
