const express = require('express');
const path = require('path');
const app = express();
const htmlDir = __dirname + '/views';

/**
 * @param {} res - Http response object
 * @param {String} file - Html file path relative to htmlDir
 * @param {Number} status - Response status code
 */
RenderHtml = (res, file, status = 200) => {
    res.status(status);
    res.sendFile(path.join(htmlDir, file));
}


app.get('/', (req, res) => {
    RenderHtml(res, 'index.html');
})

module.exports = app;