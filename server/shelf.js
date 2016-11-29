"use strict";

let db = require('./pghelper');

let findExpiredProduct = (req, res, next) => {
    let sql;
    sql = `SELECT a.product_id, b.product_name, a.inventory_sum, a.expired_date FROM inventory a, product b WHERE expired_date < now() AND a.product_id=b.id AND a.inventory_sum > 0`;
    db.query(sql, [])
        .then(result => {res.json(result)})
        .catch(next);
};

let getProducts = (req, res, next) => {
    let id = req.query.id;
    let sql = `SELECT b.id,a.inventory_sum, a.auto_stock, b.product_name, c.amount, c.threshold, b.sale_price, b.cost_price FROM inventory a, product b, shelfstatus c WHERE b.type_id=$1 AND a.product_id=b.id AND c.product_id=a.product_id`;
    db.query(sql, [id])
        .then(result => {res.json(result)})
        .catch(next);
};

let checkInventoryStatus = (req, res, next) => {
    let sql = `SELECT a.product_id, a.inventory_sum, a.threshold, b.product_name FROM inventory a, product b WHERE a.inventory_sum < a.threshold AND a.product_id=b.id`;
    db.query(sql, [])
        .then(result => {res.json(result)})
        .catch(next);
};

let checkShelfStatus = (req, res, next) => {
    let sql = `SELECT a.product_id, a.position_id, a.amount, a.threshold, b.product_name FROM shelfstatus a, product b WHERE amount < threshold AND a.product_id=b.id`;
    db.query(sql, [])
        .then(result => res.json(result))
        .catch(next);
};

let deleteItem = (req, res, next) => {
    let studentId = req.params.id;
    let supermarket_id = req.query.supermarket_id;
    db.query('DELETE FROM student WHERE id=$1 AND supermarket_id=$2', [studentId, supermarket_id], true)
        .then(() =>res.send({result: 'ok'}))
        .catch(next);
};

exports.findExpiredProduct = findExpiredProduct;
exports.getProducts = getProducts;
exports.checkInventoryStatus = checkInventoryStatus;
exports.checkShelfStatus = checkShelfStatus;
exports.deleteItem = deleteItem;
