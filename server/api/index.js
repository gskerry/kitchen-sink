'use strict'
var router = require('express').Router();
const Promise = require("bluebird");
const path = require('path');

let readFile_prom = Promise.promisify(require("fs").readFile);
let here = path.join(__dirname, './')

router.get('/myheroes', function (req, res) {
    
    readFile_prom(here+'data.json') //, 'utf-8'
        .then(function(data){
            let content = data.toString('utf-8');
            let array = JSON.parse(content)
            res.json(array)
        });

});

router.get('/myheroes/:id', function (req, res) {
    
    readFile_prom(here+'data.json') //, 'utf-8'
        .then(function(data){
            console.log(req.params.id);
            console.log(typeof req.params.id);
            // console.log(typeof data);
            // let msg = JSON.stringify(data)
            let content = data.toString('utf-8');
            // console.log(typeof content);
            let array = JSON.parse(content)
            console.log(array);
            // console.log(typeof array);
            let query = array.find(function(obj){
                console.log(typeof obj.id);
                return obj.id === req.params.id;
            })
            console.log(query);
            console.log(JSON.stringify(query)+' | '+typeof query);
            res.json(query)
            // res.send(msg[0].msg);
            // res.send('hello world');
        });

});

module.exports = router;
