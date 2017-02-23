'use strict'
const express = require('express')
const Promise = require("bluebird");
const path = require('path');

let app = express()
let readFile_prom = Promise.promisify(require("fs").readFile);
let here = path.join(__dirname, './')

app.get('/', function (req, res) {
    
    readFile_prom(here+'data.json')
        .then(data => res.send(data))
        // res.send('hello world');

});

var startServer = function () {

    var server = app.listen(1500, function () {

        var host = server.address().address
        var port = server.address().port
        console.log('server is listening at http://127.0.0.1:'+port)

    })

}

startServer();
