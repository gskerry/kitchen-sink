'use strict'
let express = require('express')
let bodyParser = require('body-parser');
let path = require('path');
let chalk = require('chalk');

const app = express()

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://127.0.0.1:1500:3001");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

let root = path.join(__dirname, '../');
let rootHtml = path.join(root, 'src/index.html');

var browserPath = path.join(root, './src');
app.use(express.static(browserPath));

var modulesPath = path.join(root, './node_modules');
app.use('/node_modules', express.static(modulesPath));

app.use('/api', require('./api'));

app.get('/', function (req, res) {
    res.sendFile(rootHtml);
});

let startServer = function () {
    var server = app.listen(1500, function () {
        var host = server.address().address
        var port = server.address().port
        console.log('server is listening at http://127.0.0.1:'+port)
    })
}

startServer();
