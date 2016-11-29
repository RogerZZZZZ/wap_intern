import * as rest from './rest';

let url = "/stockhistory";

export let findAll = (sort) => rest.get(url, {sort});
