var router = require('express').Router();

router.get('/', function (req, res) {
    console.log("hit api.");
    res.send("hit api")
});

module.exports = router;
