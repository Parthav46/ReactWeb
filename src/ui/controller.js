const express = require('express');
const path = require('path');
const app = express();
const utils = require('../../utils');
const htmlDir = __dirname + '/views';

app.get('/', (req, res) => {
    utils.RenderHtml(res, path.join(htmlDir, 'index.html'));
})

module.exports = app;