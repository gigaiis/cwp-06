const log = require('./log').log;
const file = require('fs').createWriteStream('log.txt');
let articles = require('./articles.json');

module.exports.readAll = function readAll(req, res, payload, cb) {
	log(file, '/api/articles/readall', payload);
    cb(null, articles);
}