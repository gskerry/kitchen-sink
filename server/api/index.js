'use strict'
var router = require('express').Router();
const Promise = require("bluebird");
const path = require('path');
const fs = require('fs');

let readFile_prom = Promise.promisify(require("fs").readFile);
let here = path.join(__dirname, './')

router.get('/myheroes', function (req, res) {
    readFile_prom(here+'data.json') //, 'utf-8'
        .then(function(data){
            let content = data.toString('utf-8');
            let array = JSON.parse(content)
            res.json(array)
        })
        .catch((err) => {
            console.error(err.stack)
            res.status(500).send('Something broke')
        })
});

router.get('/myheroes/:id', function (req, res) {
    readFile_prom(here+'data.json') //, 'utf-8'
        .then(function(data){
            console.log(req.params.id);
            let numid = Number(req.params.id)
            let content = data.toString('utf-8');
            let array = JSON.parse(content)
            let query = array.find(function(obj){
                return obj.id === numid;
            })
            console.log(query);
            res.json(query)
        });
});

router.post('/myheroes', function (req, res) {
    readFile_prom(here+'data.json')
        .then(function(data){
            let newobj = {} 
            let content = data.toString('utf-8');
            let array = JSON.parse(content)
            let sortRay = array.sort(function(a,b){return a.id-b.id;})
            let lastid = sortRay[sortRay.length - 1].id
            let newid = lastid + 1;
            let check = array.find(obj => {
                return obj.id === newid;
            })
            console.log(check);
            if(check === undefined){
                newobj.id = newid
                newobj.name = req.body.name
                console.log(newobj);
                array.push(newobj);
                let storeRay = JSON.stringify(array)
                fs.writeFileSync(here+'/data.json', storeRay, 'utf8', (err) => {
                    if (err) throw err;
                    console.log("data appended to file");
                });
                res.json(newobj)
            } else {
                console.log('that id already exists');
            }
        });
});

router.put('/myheroes/:id', function (req, res) {
    readFile_prom(here+'data.json')
        .then(function(data){
            console.log(req.params.id);
            let numid = Number(req.params.id)
            let content = data.toString('utf-8');
            let array = JSON.parse(content)
            let query = array.find(function(obj){
                return obj.id === numid;
            })
            console.log(query);
            console.log(req.body);
            let dex = array.indexOf(query)
            console.log('dex: ',dex);
            array.splice(dex, 1, req.body);
            console.log(array);
            let storeRay = JSON.stringify(array)
            fs.writeFileSync(here+'/data.json', storeRay, 'utf8', (err) => {
                if (err) throw err;
                console.log("data appended to file");
            });
            res.json(query)
        });
});

router.delete('/myheroes/:id', function (req, res) {
    readFile_prom(here+'data.json')
        .then(function(data){
            console.log(req.params.id);
            let numid = Number(req.params.id)
            let content = data.toString('utf-8');
            let array = JSON.parse(content)
            let query = array.find(function(obj){
                return obj.id === numid;
            })
            console.log(query);
            let dex = array.indexOf(query)
            console.log(dex);
            array.splice(dex, 1);
            console.log(array);
            let storeRay = JSON.stringify(array)
            fs.writeFileSync(here+'/data.json', storeRay, 'utf8', (err) => {
                if (err) throw err;
                console.log("data appended to file");
            });
            res.json(query)
        });
});


module.exports = router;
