import * as rest from './rest';

let url = "/sales";

export let findSales = (id, sort) => rest.get(url, {id, sort});

export let makeSale = (id, supplier_id, threshold) => rest.get(url + "/" + id, {id, supplier_id, threshold});

export let findById = (id) => rest.get(url + "/" + id, {id});
