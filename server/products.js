"use strict";

let db = require('./pghelper');

let findAll = (req, res, next) => {
    let name = req.query.name;
    let supermarket_id = req.query.supermarket_id;
    console.log(supermarket_id);
    let params = [];
    let sql;
    if (name) {
        sql = `
            SELECT id, product_name FROM product
            WHERE product_name LIKE $1 AND supermarket_id=$2 ORDER BY product_name`;
        params.push("%" + name.toLowerCase() + "%");
    } else {
        sql = `SELECT id, product_name, sale_price, cost_price FROM product WHERE supermarket_id=$1 ORDER BY product_name DESC`;
    }
    params.push(parseInt(supermarket_id));
    db.query(sql, params)
        .then(result => res.json(result))
        .catch(next);
};

let findById = (req, res, next) => {
    let id = req.params.id;
    let supermarket_id = req.query.supermarket_id;
    // let supermarket_id = req.
    let sql = "SELECT * FROM product WHERE id=$1 AND supermarket_id=$2";
    db.query(sql, [parseInt(id), supermarket_id])
        .then(product =>  res.json(product[0]))
        .catch(next);
};

let createItem = (req, res, next) => {
    let product = req.body;
    let sql = `
        INSERT INTO student
            (product_name, sale_price, cost_price, supermarket_id)
        VALUES ($1,$2,$3,$4)
        RETURNING id`;
    db.query(sql, [product.product_name, product.sale_price, product.cost_price, product.supermarket_id])
        .then(result => {
            console.log(result);
            res.json(result[0])
        })
        .catch(next);
};

let updateItem = (req, res, next) => {
    let product = req.body;
    let sql = `UPDATE product SET product_name=$1, sale_price=$2, cost_price=$3 WHERE id=$4 AND supermarket_id=$5`;
    db.query(sql, [product.product_name, product.sale_price, product.cost_price, product.id, product.supermarket_id])
        .then(() => res.send({result: 'ok'}))
        .catch(next);
};

let deleteItem = (req, res, next) => {
    let studentId = req.params.id;
    let supermarket_id = req.query.supermarket_id;
    db.query('DELETE FROM student WHERE id=$1 AND supermarket_id=$2', [studentId, supermarket_id], true)
        .then(() =>res.send({result: 'ok'}))
        .catch(next);
};

exports.findAll = findAll;
exports.findById = findById;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
