var express = require('express');
var mysql = require('mysql');

var config = require('../config');

var router = express.Router();

var pool = mysql.createPool(config);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register');
});

//普通用户注册
router.post('/putong',function(req, res, next){
  pool.getConnection(function(err, connection){
    if(err) return next(err);
    getEmail(req.body.email, function(isContained){
        insertUser(isContained, function(results){
          res.json(results);
          connection.release();
        });
    })

    function getEmail (email, fn){
        connection.query('SELECT * FROM user WHERE email = ?'
          ,[email],function(err, rows){
              if(err) return next(err);
              if(!rows[0]){
                fn(false);
              }else{
                fn(true);
              }
            });
    }

    function insertUser(isContained, fn){
      if(isContained){
        fn({
          success : false
          , message : '邮箱已被占用'
        });
      }else{
          connection.query('INSERT INTO user SET ?'
          , [req.body] ,function(err, rows){
                if(err) return next(err);
                if(!rows[0]){
                  fn({
                    success: true
                    , message: '注册成功'
                  });
                }else{
                  fn({
                    success: false
                    , message: '注册失败'
                  });
                }
              });
      }
    }
  });
});

//HR用户注册
router.post('/hr',function(req, res, next){
  pool.getConnection(function(err, connection){
    var publisher ={
      name : req.body.name2
      , password : req.body.password2
      , sex : req.body.sex2
      , birthday: req.body.birthday2
      , phone : req.body.phone2
      , email : req.body.email2
    };
    var company = {
      name : req.body.companyname
      , phone : req.body.companyphone
      , companyType : req.body.companytype
      , business : req.body.business
      , description : req.body.companydescription
      , address : req.body.companyaddress
    };
    getEmail(publisher.email ,function(pHasReg){
      getCompany(pHasReg, company.name, function(is){
        if(is){
          insertCompany(function(isInserted, comId){
            if(isInserted){
              insertPublisher(comId,function(tag){
                if(tag){
                  res.json({
                    success : true
                    , message : '注册成功'
                  });
                  connection.release();
                }else{
                  res.json({
                    success : false
                    , message : '用户注册失败'
                  });
                  connection.release();
                }
              });
            }else{
              res.json({
                success : false
                , message : '公司注册失败'
              });
              connection.release();
            }
          })
        }else{
          res.json({
            success : false
            , message : '邮箱或公司名已被注册'
          });
          connection.release();
        }
      })
    });

    //检查是否已经注册
    function getEmail (email, fn){
      connection.query('SELECT * FROM publisher WHERE email = ?'
          ,[email],function(err, rows){
            if(err) return next(err);
            if(rows[0]){
              fn(false);
            }else{
              fn(true);
            }
          });
    }

    //检查是否该公司已被注册
    function getCompany(pHasReg, comName, fn){
      connection.query('SELECT * FROM company WHERE name =?'
        ,[comName], function(err, rows){
            if(err) return next(err);
            if(rows[0]){
              fn(pHasReg && false);
            }else{
              fn(pHasReg && true);
            }
          });
    }

    //插入公司数据
    function insertCompany(fn){
      connection.query('INSERT INTO company SET ?'
          , company, function(err, rows){
            if(err) return next(err);
            if(rows.insertId){
              fn(true, rows.insertId);
            }else{
              fn(false,null);
            }
          })
    }

    //插入HR用户
    function insertPublisher(companyId, fn){
      publisher.company_id = companyId;
      connection.query('INSERT INTO publisher SET ?'
          , publisher, function(err, rows){
            if(err) return next(err);
            if(rows){
              fn(true);
            }else{
              fn(false);
            }
          });
    }
  });
});

module.exports = router;
