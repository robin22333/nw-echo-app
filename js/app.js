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
  , path = require('path')
  , config = require('./config')
  , tools = require('./tools');

var app = express();

app.get('/', function(req, res) {
    tools.loadChannel();
    res.send('load success');
});

app.get('/test', function(req, res) {
    fs.readFile(path.join(config.jsonPath, 'channel.json'), {encoding:'UTF-8',flag:'r'}, function(err, data) {
        console.log('aaa');
        if (err) {
            return console.log(err);
        }
        res.send(data);
    });
});

app.listen(3000, function(req, res) {
    console.log('server start');
});
