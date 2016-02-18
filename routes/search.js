/**
 * Created by lliangx on 2016/1/28.
 */
var express = require('express');
var app = express();

app.get('/',function(req, res, next){
    res.render('search');
});

module.exports = app;