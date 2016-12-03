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

let doStock = (req, res, next) => {
    let product_id = req.query.product_id;
    let supplier_id = req.query.supplier_id;
    let amount = req.query.amount;
    let needAuto = req.query.auto_stock;
    let sql;
    if(needAuto === 1){
        let sql1 = `select * from inventory where product_id=$1 and auto_stock=1 AND (inventory_sum-threshold)<0`;
        sql = `INSERT INTO stockhistory
            (supplier_id, product_id, amount)
        VALUES ($1,$2,$3)`
        db.query(sql1, [product_id])
            .then(result => {
                if(result.length > 0){
                    db.query(sql, [supplier_id, product_id, amount])
                        .then(result => {
                            res.send({result: 'ok'})
                        })
                        .catch(next);
                }
            })
            .catch(next);
    }else{
        sql = `INSERT INTO stockhistory
            (supplier_id, product_id, amount)
        VALUES ($1,$2,$3)`;
        db.query(sql, [supplier_id, product_id, amount])
            .then(result => {
                res.send({result: 'ok'})
            })
            .catch(next);
    }
};

exports.findAll = findAll;
exports.doStock = doStock;
