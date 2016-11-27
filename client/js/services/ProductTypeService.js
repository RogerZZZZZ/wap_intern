import * as rest from './rest';

let url = "/producttype";

export let findAll = (sort) => rest.get(url, {sort});
