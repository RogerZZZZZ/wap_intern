"use strict";

let db = require('./pghelper');

let findAll = (req, res, next) => {
    let name = req.query.name;
    let supermarket_id = req.query.supermarket_id;
    let params = [];
    let sql;
    if (name) {
        sql = `
            SELECT a.id,b.product_name,c.supplier_name,a.inventory_sum
            FROM inventory a,product b,supplier c
            WHERE a.product_id=b.id AND a.supplier_id=c.id AND b.product_name LIKE $1 AND a.supermarket_id=$2 ORDER BY product_name`;
        params.push("%" + name.toLowerCase() + "%");
    } else {
        sql = `SELECT a.id,b.product_name,c.supplier_name,a.inventory_sum,d.type_name
                FROM inventory a,product b,supplier c, producttype d
                WHERE a.product_id=b.id AND a.supplier_id=c.id AND a.supermarket_id=$1 AND a.type_id=d.id ORDER BY product_name DESC`;
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
    let sql = `SELECT a.id, a.supermarket_id, a.auto_stock, b.product_name, c.supplier_name, a.inventory_sum
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
            (product_id, supplier_id, inventory_sum, supermarket_id, type_id)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING id`;
    let sql1 = `
        INSERT INTO product (product_name, sale_price, cost_price, supermarket_id, type_id)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING id`;

    db.query(sql1, [inventory.product_name, inventory.sell_price, inventory.cost_price, inventory.supermarket_id, inventory.type_id])
        .then(result => {
            var productId = result[0].id;
            db.query(sql, [productId, inventory.supplier_id, inventory.inventory_sum, inventory.supermarket_id, inventory.type_id])
                .then(result => {
                    res.json(result[0])
                })
                .catch(next);
        })
        .catch(next);
};

let updateItem = (req, res, next) => {
    let inventory = req.body;
    let sql = `UPDATE inventory SET product_id=$1, supplier_id=$2, inventory_sum=$3, auto_stock=$4 WHERE id=$5 AND supermarket_id=$6`;
    db.query(sql, [inventory.product_id, inventory.supplier_id, inventory.inventory_sum, inventory.auto_stock, inventory.id, inventory.supermarket_id])
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
