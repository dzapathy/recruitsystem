/*Created by lliangx on 2016/1/29.*/
var express = require('express');
var mysql = require('mysql');
var config = require('../config');
var dateFormat  = require('dateformat');

var pool = mysql.createPool(config);
var app = express();

//显示工作详情
app.get('/:id',function(req, res, next){
   pool.getConnection(function(err, connection){
      connection.query('SELECT r.id AS rid,r.company_id AS rcompany_id,r.job_id AS rjob_id,r.name AS rname,r.description AS rdescription,r.salary AS rsalary,r.birthday AS rbirthday,r.experience AS rexperience,r.education AS reducation,r.number AS rnumber,r.phone AS rphone, r.createTime AS rcreateTime, '
                        +'c.id AS cid,c.name AS cname,c.phone AS cphone,c.companyType AS ccompanyType,c.business AS cbusiness,c.description AS cdescription,c.url AS curl,c.address AS caddress, '
                        +'j.id AS jid,j.name AS jname '
                        +'from recruitjob AS r, company AS c,job AS j '
                        +'WHERE r.company_id = c.id AND j.id = r.job_id'
          , [req.params.id], function(err, rows){
             if(err) return next(err);
             rows[0].rcreateTime = dateFormat(rows[0].rcreateTime, "yyyy-mm-dd");
             res.render('jobdes',{results:rows});
             connection.release();
          });
   });
});

module.exports = app;
