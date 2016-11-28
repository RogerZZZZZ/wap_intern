import * as rest from './rest';

let url = "/shelf";

export let findExpiredProduct = (sort) => rest.get(url, {sort});

export let getProducts = (id) => rest.get(url + "/" + id, {id});

export let checkInventoryStatus = (shelf) => rest.post(url, shelf);

export let checkShelfStatus = shelf => rest.put(url, shelf);
