const express = require('express');
const path = require('path');
const app = express();
const { RenderHtml } = require('../utils/web');
const htmlDir = __dirname + '/views';

app.get('/', (req, res) => {
    RenderHtml(res, path.join(htmlDir, 'index.html'));
})

module.exports = app;