export const scheme = 'http';

export const host = 'localhost';

export const port = '8080';

export const route = port.length === 0 ? `${scheme}://${host}` : `${scheme}://${host}:${port}`;

export const makeRoute = ( subroute ) => route + subroute;