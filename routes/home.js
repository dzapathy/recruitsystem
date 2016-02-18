/*Created by lliangx on 2016/1/28.*/
var express = require('express');
var mysql = require('mysql');
var dateFormat  = require('dateformat');

var config = require('../config');
var pool = mysql.createPool(config);

var app = express();

//未登录拦截
app.use(function(req, res, next){
    if(req.session.login){
        next();
    }else{
        res.redirect('/');
    }
});

//个人信息
app.get('/:id/information',function(req, res, next){
    pool.getConnection(function(err, connection){
        if(err) return next(err);
        connection.query("SELECT * FROM user WHERE id =?",
            [req.params.id], function (err, rows) {
                if(err) return next();
                rows[0].birthday = dateFormat(rows[0].birthday, "yyyy-mm-dd");
                res.render('infor',{results:rows});
                connection.release();
            });
    });
});

//投递详情
app.get('/:id/detail',function(req, res, next){
    pool.getConnection(function(err, connection){
        if(err) return next(err);
        connection.query('SELECT r.id AS rid, r.name AS rname, c.name AS cname,r.salary,r.createTime '
                        +'FROM recruitjob as r,company as c, applicant as a '
                        +'WHERE r.company_id = c.id AND a.recruitJob_id = r.id AND a.user_id = ?'
        , [req.params.id], function(err, rows){
                if(err) return next(err);
                console.log(rows);
                for(var i = 0,l=rows.length; i < l; i++ ){
                    rows[i].createTime = dateFormat(rows[i].createTime, "yyyy-mm-dd");
                }
                res.render('detail',{results:rows});
                connection.release();
            });
    });
});

//通知
app.get('/:id/notice',function(req, res, next){
    res.render('notice');
});

app.get('/logout',function(req, res, next){
    delete req.session.login;
    delete req.session.url;
    res.redirect('/');
});

module.exports = app;
