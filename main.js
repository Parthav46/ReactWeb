const express = require('express');
const utils = require('./utils');
const https = utils.Config.SERVER.HTTPS ? require('https') : require('http');
const app = express();

const host = utils.Config.SERVER.HOST;
const port = utils.Config.SERVER.PORT;
const devServerEnabled = (process.env.ENV || "development") == "development";

// Webpack dependencies
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

// API dependencies
const api = require('./src/api/controller');

// Web dependencies
const web = require('./src/ui/controller');

// React webpack
if (devServerEnabled) {

    config.forEach(module => {
        let appName = module.devServer.publicPath + "/" + module.output.filename.substr(0, module.output.filename.length - 3);
        module.entry.app.unshift('webpack-hot-middleware/client?reload=true&timeout=1000&path=/__webpack_hmr_' + appName);
        module.plugins.push(new webpack.HotModuleReplacementPlugin());

        let compiler = webpack(module);

        //Enable "webpack-dev-middleware"
        app.use(webpackDevMiddleware(compiler, {
            publicPath: "/dist/modules"
        }));

        //Enable "webpack-hot-middleware"
        app.use(webpackHotMiddleware(compiler, {
            path: '/__webpack_hmr_' + appName
        }));
    });

} else {
    app.use('/dist', express.static('./dist'));
}

// Static
app.use(express.static('./public'));

// API
app.use('/api/', api);

// Web
app.use('/', web);

const server = https.createServer(app);
server.listen(port, host, () => {
    console.log('Server started on: ' + (utils.Config.SERVER.HTTPS ? 'https://' : 'http://') + host + ':' + port);
});
