"use strict";

let db = require('./pghelper');

let findAll = (req, res, next) => {
    let name = req.query.name;
    let params = [];
    let sql;
    sql = `select a.id, a.amount, b.product_name, c.supplier_name from stockhistory a, product b, supplier c where a.supplier_id=c.id and a.product_id=b.id`;
    db.query(sql, params)
        .then(result => res.json(result))
        .catch(next);
};

exports.findAll = findAll;
