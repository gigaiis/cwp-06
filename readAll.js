const log = require('./log').log;
const file = require('fs').createWriteStream('log.txt');
let articles = require('./articles.json');
let sortedArticles = {};

module.exports.readAll = function readAll(req, res, payload, cb) {
	if (payload === undefined) payload = { sortField: 'date', sorter: 'desc', page: 1, limit: 10, includeDeps: false };
    else {
        if (payload.sortField === undefined) payload.sortField = 'date';
        if (payload.sorter === undefined) payload.sorter = 'desc';
        if (payload.includeDeps === undefined) payload.includeDeps = false;
    }
    sortedArticles = articles.slice();
    if (payload.sortField === 'id') sort(payload, (a, b) => { return a.id - b.id; } );
    else if (payload.sortField === 'title') sort(payload, (a, b) => { a.title.localeCompare(b.title); } );
    else if (payload.sortField === 'text') sort(payload, (a, b) => { a.text.localeCompare(b.text); } );
    else if (payload.sortField === 'date') sort(payload, (a, b) => { return a.date - b.date; } );
    else if (payload.sortField === 'author') sort(payload, (a, b) => { a.author.localeCompare(b.author); } );
    else cb( { error: '400', errorText: 'Invalid request' } );

    if (payload.includeDeps === false) {
        sortedArticles = sortedArticles.map((element) => {
            let obj = Object.assign({}, element);
            delete obj.comments;
            return obj;   
        });
    }

    let articlesResponse = { items : sortedArticles, meta : { page : 1, pages: 0, count: articles.length, limit: 10 } };
    if (payload.page !== undefined) articlesResponse.meta.page = payload.page;
    if (payload.limit !== undefined) articlesResponse.meta.limit = payload.limit;
    articlesResponse.meta.pages = Math.ceil(articlesResponse.meta.count / articlesResponse.meta.limit);
    articlesResponse.items = articlesResponse.items.splice(
    	(articlesResponse.meta.page - 1) * articlesResponse.meta.limit,
    	articlesResponse.meta.limit * articlesResponse.meta.page
    );
    log(file, '/api/articles/readall', payload);
    cb(null, articles);
}

function sort(payload, func) {
    sortedArticles.sort(func);
    if(payload.sorter === 'asc') sortedArticles.reverse();
}