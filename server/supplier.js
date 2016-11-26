"use strict";

let db = require('./pghelper');

let findAll = (req, res, next) => {
    let name = req.query.name;
    let params = [];
    let sql;
    if (name) {
        sql = `
            SELECT *
            FROM supplier
            WHERE supplier_name LIKE $1 ORDER BY supplier_name`;
        params.push("%" + name.toLowerCase() + "%");
    } else {
        sql = `SELECT * FROM supplier`;
    }
    db.query(sql, params)
        .then(result => res.json(result))
        .catch(next);
};

let findById = (req, res, next) => {
    let id = req.params.id;
    let supermarket_id = req.query.supermarket_id;
    // let supermarket_id = req.
    let sql = `SELECT a.id, a.supermarket_id, b.product_name, c.supplier_name, a.inventory_sum
            FROM inventory a,product b,supplier c
            WHERE a.product_id=b.id AND a.supplier_id=c.id AND a.id=$1 AND a.supermarket_id=$2`;
    db.query(sql, [parseInt(id), supermarket_id])
        .then(product =>  res.json(product[0]))
        .catch(next);
};

let createItem = (req, res, next) => {
    let inventory = req.body;
    let sql = `
        INSERT INTO inventory
            (product_id, supplier_id, inventory_sum, supermarket_id)
        VALUES ($1,$2,$3,$4)
        RETURNING id`;
    db.query(sql, [inventory.product_id, inventory.supplier_id, inventory.inventory_sum, inventory.supermarket_id])
        .then(result => {
            console.log(result);
            res.json(result[0])
        })
        .catch(next);
};

let updateItem = (req, res, next) => {
    let inventory = req.body;
    let sql = `UPDATE inventory SET product_id=$1, supplier_id=$2, inventory_sum=$3 WHERE id=$4 AND supermarket_id=$5`;
    db.query(sql, [inventory.product_id, inventory.supplier_id, inventory.inventory_sum, inventory.id, inventory.supermarket_id])
        .then(() => res.send({result: 'ok'}))
        .catch(next);
};

let deleteItem = (req, res, next) => {
    let inventoryId = req.params.id;
    let supermarket_id = req.query.supermarket_id;
    db.query('DELETE FROM inventory WHERE id=$1 AND supermarket_id=$2', [inventoryId, supermarket_id], true)
        .then(() =>res.send({result: 'ok'}))
        .catch(next);
};

exports.findAll = findAll;
exports.findById = findById;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
