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

let makeSale = (req, res, next) => {
    let id = req.query.id;
    let supplier_id = req.query.supplier_id;
    let threshold = req.query.threshold;
    let sql = `UPDATE inventory SET inventory_sum=inventory_sum-20 WHERE product_id=$1 AND (inventory_sum-20)>0`;
    let sql1 = `SELECT * FROM inventory WHERE product_id=$1 AND auto_stock=1 AND (inventory_sum-threshold)<0`;
    let sql2 = `INSERT INTO stockhistory
        (supplier_id, product_id, amount)
    VALUES ($1,$2,$3)`
    db.query(sql, [id])
        .then(() => {
            db.query(sql1, [id])
                .then(product => {
                    if(product.length > 0){
                        db.query(sql2, [supplier_id, id, threshold])
                            .then(product => {
                                res.send({result: 'ok'})
                            })
                            .catch(next);
                    }else{
                        console.log("-------");
                        res.json(product)
                    }
                })
                .catch(next);
        })
        .catch(next);
};

let findById = (req, res, next) => {
    let id = req.params.id;
    let supermarket_id = req.query.supermarket_id;
    // let supermarket_id = req.
    let sql = "SELECT * FROM inventory WHERE product_id=$1 AND auto_stock=1 AND (inventory_sum-threshold)<0";
    db.query(sql, [id])
        .then(product =>  res.json(product))
        .catch(next);
};

exports.findSales = findSales;
exports.makeSale = makeSale;
exports.findById = findById;
