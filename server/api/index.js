'use strict'
var router = require('express').Router();
const Promise = require("bluebird");
const path = require('path');

let readFile_prom = Promise.promisify(require("fs").readFile);
let here = path.join(__dirname, './')

router.get('/myheroes', function (req, res) {
    
    readFile_prom(here+'data.json') //, 'utf-8'
        .then(function(data){
            // console.log(typeof data);
            // let msg = JSON.stringify(data)
            let content = data.toString('utf-8');
            // console.log(typeof content);
            let array = JSON.parse(content)
            // console.log(typeof array);
            let query = array.find(function(obj){
                return obj.id === 1;
            })
            // res.json(array)
            console.log(query);
            res.json(query)
            // res.send(msg[0].msg);
        });
        // res.send('hello world');

});

module.exports = router;
