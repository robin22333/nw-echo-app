'use strict'

/**
 *┌──────────┐
 *| ■      ■ |
 *|   bug    |
 *|   stop   |
 *|   here   |
 *|          |
 *|  巴  千  |
 *|  格  行  |
 *|  不  代  |
 *|  沾  码  |
 *|  身  过  |
 *|          |
 *|  →   ←   |
 *|    ＾    | 
 *└──────────┘
 *
 * @description node-webkit echo app
 * @version 1.0.0
 * @author luob
 * @update 2015-11-09
 */

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
