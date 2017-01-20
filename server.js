var express = require("express");
var https = require("https");
var fs = require("fs");
var pem = require("pem");

pem.createCertificate({
}, function (err, keys) {
    var app = express();

    var httpsServer = https.createServer({
        key: keys.serviceKey,
        cert: keys.certificate
    }, app);

    app.get("/", function (req, res) {
        res.sendFile("index.html", { root: __dirname });
        console.log("hello! " + __dirname);
    });

    httpsServer.listen(8001, () => {
        console.log("hosting!");
        console.log(keys.certificate);
    });
});