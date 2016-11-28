import * as rest from './rest';

let url = "/command";

export let findAll = (staff_id, sort) => rest.get(url, {staff_id, sort});

export let handlerTask = (id, product_id, type, diff) => rest.get(url + "/" + id, {id, product_id, type, diff});

export let createItem = command => rest.post(url, command);

export let updateItem = command => rest.put(url, command);
