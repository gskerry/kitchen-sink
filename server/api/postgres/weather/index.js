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

let Weather = sequelize.define('weather', {
    city: {
        type: Sequelize.STRING
    },
    temp_lo: {
        type: Sequelize.INTEGER
    },
    temp_hi: {
        type: Sequelize.INTEGER
    },
    prcp: {
        type: Sequelize.REAL
    },
    date: {
        type: Sequelize.DATEONLY
    }
});

Weather.sync();

router.get('/', function (req, res) {
    // console.log(req);
    Weather.findAll().then(function(datas) {
        res.send(datas);
    })
});

router.get('/:id', function (req, res) {
    Weather.findById(req.params.id, {})
        .then(function(datas) {
            res.send(datas);
        })
});

router.post('/', function (req, res) {
    console.log("req.body: ",req.body);    
    Weather.create(req.body)
        .then(function (newRecord) {
            res.status(200).json(newRecord);
        })
        .catch(function (error){
            res.status(500).json(error);
        }); 
});

router.put('/:id', function (req, res) {
    console.log("req.body: ",req.body);    
    Weather.update(req.body, { where: { id: req.params.id } })
        .then(function (updatedRecord) {
            res.status(200).json(updatedRecord);
        })
        .catch(function (error){
            res.status(500).json(error);
        }); 
});

router.delete('/:id', function (req, res) {
    console.log("req.body: ",req.body);    
    Weather.destroy({ where: { id: req.params.id } })
        .then(function (deletedRecord) {
            res.status(200).json(deletedRecord);
        })
        .catch(function (error){
            res.status(500).json(error);
        }); 
});

module.exports = router;
