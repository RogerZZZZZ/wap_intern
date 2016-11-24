import * as rest from './rest';

let url = "/user";

export let signIn = user => rest.post(url, user);
