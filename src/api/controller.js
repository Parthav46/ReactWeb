const express = require('express');
const { GetCookies, GetCookie } = require('../utils/web');

const app = express();

app.get('/',  (req, res) => {
    res.end(JSON.stringify(GetCookies(req)));
});

app.get('/:key', (req, res) => {
    const key = req.params.key;
    res.end(GetCookie(req, key));
})

module.exports = app;
