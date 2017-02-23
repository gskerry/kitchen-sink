const express = require('express')

var app = express()

app.get('/', function (req, res) {
    res.send('hello world');
});

var startServer = function () {

    var server = app.listen(1500, function () {

        var host = server.address().address
        var port = server.address().port
        console.log('server is listening at http://127.0.0.1:'+port)

    })

}

startServer();
