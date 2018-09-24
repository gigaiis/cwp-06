module.exports.log = function log(file, url, data) {
    file.write(`[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]> url: ${url}, request: ${JSON.stringify(data)}\r\n`)
}