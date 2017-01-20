var express = require("express");
var https = require("https");
var fs = require("fs");
var pem = require("pem");

pem.createCertificate({
}, function (err, keys) {
    var app = express();
    app.use("/scripts", express.static(__dirname + "/scripts/")); // to allow linked files

    var httpsServer = https.createServer({
        key: keys.serviceKey,
        cert: keys.certificate
    }, app);

    app.get("/", function (req, res) {
        res.sendFile("index.html", { root: __dirname });
        console.log("Someone wanted to get this page!  " + __dirname);
    });

    httpsServer.listen(8001, () => {
        console.log("hosting!");
        console.log(keys.certificate);
    });
});