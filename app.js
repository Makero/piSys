﻿var express = require('express');
var path = require('path');
var swig = require('swig');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var urls = require('./urls.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'htm');
app.engine('htm',swig.renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//配置session
app.use(session({
  secret:'secret',
  resave:true,
  saveUninitialized:false,
  cookie:{
    maxAge:1000*60*60*24*1 //过期时间设置(单位毫秒)
  }
}));
app.use(function(req, res, next){
  res.locals.user = req.session.user;
  var err = req.session.error;
  res.locals.message = '';
  if (err) res.locals.message = '<div style="margin-bottom: 20px;color:red;">' + err + '</div>';
  next();
});

//映射URL
for(key in urls){
  app.use(key,require(urls[key]));
}

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

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
