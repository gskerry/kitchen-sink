'use strict';
let router = require('express').Router();

router.use('/flatfile', require('./flatfile'));

// error catching
router.use(function (req, res) {
    res.status(404).end();
});

module.exports = router;
