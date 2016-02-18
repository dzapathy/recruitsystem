var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore  = require('connect-mongo')(session); //使用mongodb存储session
var url = require('url');

var routes = require('./routes/index');
var register = require('./routes/register');
var recruit = require('./routes/recruit');
var search =require('./routes/search');
var home = require('./routes/home');
var jobdes = require('./routes/jobdes');
var login = require('./routes/login');
var modify = require('./routes/modify');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'keyboard cat',
  cookie: { maxAge: 60000*60*24*14 }, //两周
  store: new MongoStore({url: 'mongodb://localhost/recruit-app'})
}));

app.use(function(req, res, next){
  res.locals.login = req.session.login;
  res.locals.url = req.session.url;
  res.locals.userId = req.session.userId;
  next();
});

app.use('/', routes);
app.use('/register', register);
app.use('/recruit',recruit);
app.use('/search',search);
app.use('/home',home);
app.use('/jobdes',jobdes);
app.use('/login',login);
app.use('/modify',modify);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
