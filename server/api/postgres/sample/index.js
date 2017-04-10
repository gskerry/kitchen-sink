"use strict";
let Sequelize = require('sequelize');
let router = require('express').Router();

let sequelize = new Sequelize('postgresql://postgres:mysecretpassword@localhost:5432/postgres', {
    dialect: 'postgres',
    define: {
        timestamps: false // (!) model does NOT sync with db if this is not set and table does not have timestamps in it.
    }
})

sequelize
    .authenticate()
    .then(function(err) {
        if (!!err) {
            console.log('Unable to connect to the database:', err)
        } else {
            console.log('Connection has been established successfully.')
        }
    });

let Table = sequelize.define('testdata', {
    dex: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    msg: {
        type: Sequelize.STRING
    }
});

Table.sync();

router.get('/', function (req, res) {
    // res.send("helloworld.");
    Table.findAll().then(function(datas) {
        res.send(datas);
    })
});

router.get('/:id', function (req, res) {
    Table.findById(req.params.id, {})
        .then(function(datas) {
            res.send(datas);
        })
});

module.exports = router;
