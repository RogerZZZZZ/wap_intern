"use strict";

let db = require('./pghelper');

let findSales = (req, res, next) => {
    let id = req.query.id;
    let params = [];
    let sql;
    sql = `SELECT COUNT(create_date), create_date FROM billdetail WHERE product_id=$1 GROUP BY create_date`;
    params.push(parseInt(id));
    db.query(sql, params)
        .then(result => res.json(result))
        .catch(next);
};

exports.findSales = findSales;
