'use strict';
let router = require('express').Router();

router.use('/heroes', require('./heroes'));

// error catching
router.use(function (req, res) {
    res.status(404).end();
});

module.exports = router;

