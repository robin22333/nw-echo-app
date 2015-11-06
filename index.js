'use strict'

var express = require('express')
  , superagent = require('superagent')
  , cheerio = require('cheerio')
  , fs = require('fs')
  , tools = require('./tools');

var app = express();

app.get('/', function(req, res) {
    var stream = fs.createWriteStream('static/img/1.jpeg');
    var req = superagent.get('http://kibey-echo.b0.upaiyun.com/poster/2015/02/05/979d49a81f1d2953.jpeg');
    req.pipe(stream);

});

app.get('/test', function(req, res) {
    tools.loadChannel();
    res.send('加载成功');
});

app.listen(3000, function(req, res) {
    console.log('server start');
});
