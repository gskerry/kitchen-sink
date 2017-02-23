'use strict'
const express = require('express')
const Promise = require("bluebird");
const path = require('path');

let app = express()
let readFile_prom = Promise.promisify(require("fs").readFile);
let here = path.join(__dirname, './')

app.get('/', function (req, res) {
    
    readFile_prom(here+'data.json') //, 'utf-8'
        .then(function(data){
            console.log(typeof data);
            // let msg = JSON.stringify(data)
            let content = data.toString('utf-8');
            console.log(typeof content);
            let msg = JSON.parse(content)
            console.log(typeof msg);
            res.json(msg)
        });
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
