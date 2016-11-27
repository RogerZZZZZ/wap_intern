"use strict";

let db = require('./pghelper');

let findAll = (req, res, next) => {
    let name = req.query.name;
    let params = [];
    let sql;
    if (name) {
        sql = `
            SELECT *
            FROM producttype
            WHERE type_name LIKE $1 ORDER BY type_name`;
        params.push("%" + name.toLowerCase() + "%");
    } else {
        sql = `SELECT * FROM producttype`;
    }
    db.query(sql, params)
        .then(result => res.json(result))
        .catch(next);
};

exports.findAll = findAll;
