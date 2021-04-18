const path = require('path');
const Config = require('./appsettings.json');
let utils = {};

/**
 * @param {} res - Http response object
 * @param {String} file - Html file path relative to htmlDir
 * @param {Number} status - Response status code
 */
utils.RenderHtml = (res, file, status = 200) => {
    res.status(status);
    res.sendFile(file);
}

/**
 * @param {String} req - cookie key name
 * @returns {String} cookie value
 */
utils.GetCookies = (req) => {
    const cookieStr = req.headers.cookie;
    var cookies = cookieStr.split('; ').reduce((res, cookie) => {
        const data = cookie.trim().split('=');
        return {...res, [data[0]]: data[1]}
    }, {});
    return cookies;
}

utils.Config = Config;

module.exports = utils;