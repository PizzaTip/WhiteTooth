"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var port = 3000;
app.get('*', function (req, res) {
    res.send("Called URL " + req.url);
});
app.listen(port, function () { return console.log("Example app listening on port " + port + "!"); });
