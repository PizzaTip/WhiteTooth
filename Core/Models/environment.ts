import e  = require('./response');

export interface Environment {
    name: string,
    relativePath: string,
    responses: [e.Response]
}