import * as rest from './rest';

let url = "/stockhistory";

export let findAll = (sort) => rest.get(url, {sort});

export let doStock = (product_id, supplier_id, amount, auto_stock) => rest.get(url + '/' + product_id, {product_id, supplier_id, amount, auto_stock});
