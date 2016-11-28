"use strict";

let db = require('./pghelper');

let findAll = (req, res, next) => {
    let name = req.query.name;
    let staff_id = req.query.staff_id;
    let params = [];
    let sql;
    sql = `SELECT a.content, a.id, a.type_id, a.product_id, b.amount, b.threshold, c.inventory_sum, b.position_id, e.product_name FROM command a, shelfstatus b, inventory c, staff d, product e WHERE a.to_id=$1 AND a.status=1 AND b.product_id=a.product_id And c.product_id=a.product_id AND d.id=a.to_id AND e.id=a.product_id ORDER BY a.create_date DESC`;
    params.push(parseInt(staff_id));
    db.query(sql, params)
        .then(result => res.json(result))
        .catch(next);
};

let handlerTask = (req, res, next) => {
    let id = req.query.id;
    let product_id = req.query.product_id;
    let type = parseInt(req.query.type);
    let diff = req.query.diff;
    if(type === 1){
        let sql = `UPDATE shelfstatus SET amount=threshold WHERE product_id=$1`;
        let sql1 = `UPDATE inventory SET inventory_sum=(inventory_sum-$1) WHERE product_id=$2`;
        let sql2 = `UPDATE command SET status=0 WHERE id=$1`;

        db.query(sql, [product_id])
            .then(() => {
                db.query(sql1, [diff,product_id])
                    .then(() => {
                        db.query(sql2, [id])
                            .then(product =>  res.json(product[0]))
                            .catch(next);
                    })
                    .catch(next);
            })
            .catch(next);
    }else if(type === 2 || type === 3){
        let sql = `UPDATE command SET status=0 WHERE id=$1`;
        db.query(sql, [id])
            .then(product =>  res.json(product[0]))
            .catch(next);
    }else if(type === 3){

    }
};

let createItem = (req, res, next) => {
    let command = req.body;
    let sql = `
        INSERT INTO command
            (from_id, to_id, content, type_id, product_id, status)
        VALUES ($1,$2,$3,$4,$5,1)
        RETURNING id`;
    db.query(sql, [command.from_id, command.to_id, command.content, command.type_id, command.product_id])
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
exports.handlerTask = handlerTask;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
