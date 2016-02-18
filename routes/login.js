/**
 * Created by lliangx on 2016/2/1.
 */
var express = require('express');
var mysql = require('mysql');
var config = require('../config');

var pool  = mysql.createPool(config);

var app = module.exports = express();

app.post('/', function(req, res, next ){
    pool.getConnection(function(err, connection) {
        if(err) return next(err);
        connection.query( 'SELECT id,url FROM user WHERE email=? and password=?',
        [req.body.email, req.body.password],function(err, rows){
                console.log(rows);
                if(err) return next(err);
                if(rows[0]){
                    req.session.login = true;
                    req.session.url = rows[0].url;
                    req.session.userId = rows[0].id;
                    res.json({success: true });
                }else{
                    req.session.login = false;
                    res.json({success: false });
                }
                connection.release();
            });
    });
});