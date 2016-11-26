import * as rest from './rest';

let url = "/supplier";

export let findAll = (sort) => rest.get(url, {sort});

export let findByName = (name, supermarket_id) => rest.get(url, {name, supermarket_id});

export let findById = (id, supermarket_id) => rest.get(url + "/" + id, {supermarket_id});

export let createItem = product => rest.post(url, product);

export let updateItem = product => rest.put(url, product);

export let deleteItem = (id, supermarket_id) => rest.del(url + "/" + id, {supermarket_id});
