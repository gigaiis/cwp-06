const log = require('./log').log;
let articles = require('./articles.json');

module.exports.createComment = function createComment(req, res, payload, cb) {
	if ((payload.articleId == undefined) || (payload.text == undefined) ||
		(payload.date == undefined) || (payload.author == undefined)) 
		cb({ code: 400, message: 'Invalid request'});
	else {
	    let ind = articles.findIndex(i => i.id == payload.articleId);
	    if (ind != -1) {
	    	log('/api/comments/create', payload);
	        payload.id = Date.now();
	        if (articles[ind].comments == undefined) articles[ind].comments = [];
	        articles[ind].comments.push(payload);
	        cb(null, articles);
	    }
	    else cb({ code: 400, message: 'Invalid request' });
	}
}