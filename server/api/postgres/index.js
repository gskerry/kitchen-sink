'use strict'
let router = require('express').Router();

router.get('/', function (req, res) {
    console.log(req);
    res.send("helloworld.");
});

module.exports = router;
