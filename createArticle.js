const log = require('./log').log;
let articles = require('./articles.json');

module.exports.createArticle = function createArticle(req, res, payload, cb) {
	if (payload.comments === undefined) payload.comments = [];
	if ((payload.title === undefined) || (payload.date === undefined) ||
		(payload.text === undefined) || (payload.author === undefined)) 
		cb({ code: 400, message: 'Invalid request'});
	else {
		log('/api/articles/create', payload);
	    payload.id = Date.now();
	    articles.push(payload);
	    cb(null, payload);
	}
}