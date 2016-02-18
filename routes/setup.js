/**
 * Created by lliangx on 2016/1/27.
 */
var mysql = require('mysql');
var config = require('../config');

var connection = mysql.createConnection(config);

delete config.database;
connection.query('DROP DATABASE recruit');

connection.query('CREATE DATABASE  recruit;');

connection.query('USE recruit;');

connection.query('DROP TABLE IF EXISTS notice;');
connection.query('DROP TABLE IF EXISTS publisher;');
connection.query('DROP TABLE IF EXISTS applicant;');
connection.query('DROP TABLE IF EXISTS user;');
connection.query('DROP TABLE IF EXISTS recruitJob;');
connection.query('DROP TABLE IF EXISTS job;');
connection.query('DROP TABLE IF EXISTS company;');

/*公司*/
connection.query('CREATE TABLE company('+
                    'id INT(11) AUTO_INCREMENT,'+
                    'name VARCHAR(255) UNIQUE,'+
                    'url VARCHAR(255),'+
                    'description TEXT,'+
                    'address VARCHAR(255),'+
                    'companyType VARCHAR(255),'+
                    'phone VARCHAR(255),'+
                    'business VARCHAR(255),'+
                    'PRIMARY KEY (id)'+
                ');');

connection.query('INSERT INTO company '
        +'set name=?,url=?,description=?,address=?,companyType=?,phone=?,business=?',
        ['阿里巴巴','http://p.qq181.com/cms/1210/2012100413195471481.jpg','中国最大的网络公司和世界第二大网络公司，是由马云在1999年一手创立企业对企业的网上贸易市场平台.'
        ,'香港（国际总部）、杭州（中国总部）','股份制','18698662173','互联网']);

/*工作*/
connection.query('CREATE TABLE job('+
                    'id INT(11) AUTO_INCREMENT,'+
                    'name VARCHAR(255),'+
                    'PRIMARY KEY (id)'+
                 ');');

connection.query('INSERT INTO job set name="销售";');
connection.query('INSERT INTO job set name="营业员";');
connection.query('INSERT INTO job set name="攻城狮";');
connection.query('INSERT INTO job set name="程序员";');
connection.query('INSERT INTO job set name="界面设计";');
connection.query('INSERT INTO job set name="产品经理";');
connection.query('INSERT INTO job set name="运维师";');

/*招聘职务*/
connection.query('CREATE TABLE recruitJob('+
                    'id INT(11) AUTO_INCREMENT,'+
                    'company_id INT(11),'+
                    'job_id INT(11),'+
                    'name VARCHAR(255) NOT NULL,'+
                    'description TEXT,'+
                    'salary FLOAT DEFAULT -1,'+
                    'birthday DATE,'+
                    'experience VARCHAR(255) DEFAULT \'不限\','+
                    'education VARCHAR(255) DEFAULT \'不限\','+
                    'number INT DEFAULT -1,'+
                    'phone VARCHAR(12),'+
                    'createTime DATE,'+
                    'PRIMARY KEY(id),'+
                    'FOREIGN KEY(company_id) REFERENCES company(id),'+
                    'FOREIGN KEY(job_id) REFERENCES job(id)'+
                 ');');

/*用户*/
connection.query('CREATE TABLE user('+
                    'id INT(11) AUTO_INCREMENT,'+
                    'name VARCHAR(255) NOT NULL,'+
                    'password VARCHAR(50) NOT NULL,'+
                    'sex VARCHAR(2),'+
                    'birthday DATE,'+
                    'phone VARCHAR(255),'+
                    'email VARCHAR(255) UNIQUE,'+
                    'url VARCHAR(255),'+
                    'address VARCHAR(255),'+
                    'education VARCHAR(255),'+
                    'experience VARCHAR(255),'+
                    'description TEXT,'+
                    'PRIMARY KEY(id)'+
                ');');

connection.query('INSERT INTO user '+
                'set name=?,password=?,sex=?,birthday=?,phone=?,email=?,url=?,address=?,education=?,experience=?,description=?',
                ['dazhi','123456','男',new Date('1994/4/16'),'18698662173','1274654342@qq.com','http://p0.so.qhimg.com/t01ca32feeb219c5bd5.jpg',
                '辽宁省盘锦市','本科','无','我就是我~']);

/*应聘*/
connection.query('CREATE TABLE applicant('+
                    'user_id INT(11),'+
                    'recruitJob_id INT(11),'+
                    'FOREIGN KEY(user_id) REFERENCES user(id),'+
                    'FOREIGN KEY(recruitJob_id) REFERENCES recruitJob(id)'+
                ');');

/*发布者*/
connection.query('CREATE TABLE publisher('+
                    'id INT(11) AUTO_INCREMENT,'+
                    'company_id INT(11),'+
                    'name VARCHAR(255) NOT NULL,'+
                    'password VARCHAR(50) NOT NULL,'+
                    'sex VARCHAR(2),'+
                    'birthday DATE,'+
                    'url VARCHAR(255),'+
                    'phone VARCHAR(255),'+
                    'email VARCHAR(255) UNIQUE,'+
                    'PRIMARY KEY(id)'+
                ');');

connection.query('INSERT INTO publisher'+
                ' set company_id=?,name=?,password=?,sex=?,birthday=?,url=?,phone=?,email=?',
                [1,'zhangsan','123456','男',new Date('1990/9/18'),'http://p0.so.qhimg.com/t0190ec155bc3302165.jpg','13898765432','1234567@qq.com']);

/*通知*/
connection.query('CREATE TABLE notice('+
                    'id INT(11) AUTO_INCREMENT,'+
                    'recruitJob_id INT(11),'+
                    'stats VARCHAR(2),'+
                    'description TEXT,'+
                    'PRIMARY KEY(id),'+
                    'FOREIGN KEY(recruitJob_id) REFERENCES recruitJob(id)'+
                ');');

connection.end(function(){
    process.exit();
});
