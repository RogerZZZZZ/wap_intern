import * as rest from './rest';

let url = "/sales";

export let findSales = (id, sort) => rest.get(url, {id, sort});
