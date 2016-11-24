"use strict";

let db = require('./pghelper');


let signIn = (req, res, next) =>{
    let user = req.body;
    console.log(user);
    let username = user.username;
    let password = user.password;
    let sql = 'SELECT position_type,supermarket_id FROM staff WHERE username=$1 AND password=$2 ';
    db.query(sql, [username, password])
        .then(result => res.json(result))
        .catch(next);
}


exports.signIn = signIn;
