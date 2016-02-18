/**
 * Created by lliangx on 2016/2/2.
 */
var express = require('express');
var mysql = require('mysql');
var config = require('../config');

var pool = mysql.createPool(config);

var app = module.exports = express();

//修改基本信息
app.post('/:id/basic',function(req, res, next){
    //req.body.id = req.params.id;
    pool.getConnection(function(err, connection){
        if(err) return next(err);
        connection.query("UPDATE user SET ? WHERE id = ?"
            ,[req.body, req.params.id],function(err, rows){
                if(err){
                    res.json({success:false});
                    return next();
                }
                if(rows.changedRows != 0){
                    res.json({success:true});
                }else{
                    res.json({success:'nochange'});
                }
                connection.release();
            });
    });
});

//修改头像
app.post('/:id/touxiang',function(req, res, next ){
    pool.getConnection(function(err, connection){
        if(err) return next(err);
        connection.query('UPDATE user SET ? WHERE id = ?'
            ,[req.body, req.params.id],function(err, rows){
                if(err){
                    res.json({success:false});
                    return next();
                }
                if(rows.changedRows != 0){
                    req.session.url = req.body.url;
                    res.json({success:true});
                }else{
                    res.json({success:'nochange'});
                }
                connection.release();
            });
    });
});

//修改密码
app.post('/:id/pass',function(req, res, next){
    console.log("mess: "+ req.body.passwordNew +" "+req.params.id + " "+req.body.passwordOld);
    pool.getConnection(function(err, connection){
        if(err) return console.log(err.stack);
        connection.query('UPDATE user SET password =? WHERE id = ? AND password =?'
            ,[req.body.passwordNew, req.params.id, req.body.passwordOld], function(err, rows){
                if(err){
                    res.json({success:false});
                    return console.log(err.stack);
                }
                if(rows.changedRows != 0){
                    res.json({ success: true });
                }else{
                    res.json({ success: false });
                }
                connection.release();
            });
    });
});