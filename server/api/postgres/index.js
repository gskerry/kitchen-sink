"use strict";
let router = require('express').Router();

router.use('/sample', require('./sample'));
router.use('/weather', require('./weather'));

// error catching
router.use(function (req, res) {
    res.status(404).end();
});

module.exports = router;
