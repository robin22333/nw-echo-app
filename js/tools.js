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
 * @description node-wekit echo app
 * @version 1.0.0
 * @author luob
 * @update 2015-11-09
 */

var superagent = require('superagent')
  , cheerio = require('cheerio')
  , eventproxy = require('eventproxy')
  , url = require('url')
  , path = require('path')
  , fs = require('fs')
  , logger = require('./logger')
  , config = require('./config');

function loadPageUrl(url, callback) {
    var pageUrls = [];
    superagent.get(url)
      .end(function(err, res) {
          if (err) {
              return logger.log(err);
          }
          var $ = cheerio.load(res.text);
          var href = $('.pagination .active a').attr('href');
          var totalPageIndex = href.indexOf('-page=') + 6;
          var totalPage = Number(href.substring(totalPageIndex));
          for (var i=1; i<totalPage; i++) {
              var pageUrl = url + '=&page=' + i + '&per-page=' + totalPage;
              pageUrls.push(pageUrl);
          }
          logger.log(pageUrls);
          callback(pageUrls);
    });
}

function loadChannel() {
    var pageUrl = config.url + 'channel/list?wp';
    loadPageUrl(pageUrl, function(pageUrls) {
        var ep = eventproxy();

        ep.after('load_channel', pageUrls.length, function(pages) {
            var channels = [];
            pages.forEach(function(page) {
                var pageNum = page[0];
                var pageHtml = page[1];
                var pageChannel = [];
                var $ = cheerio.load(pageHtml);
                $('.channel-cover-wp').each(function(i, e) {
                    var $e = $(e);
                    var channelName = $e.text().trim();
                    var picUrl = $e.find('img').attr('src');
                    var href = $e.find('a').attr('href');
                    var channelUrl = url.resolve(config.url, href);
                    pageChannel.push({
                        channelName: channelName,
                        channelUrl: channelUrl,
                        picUrl: picUrl
                    });
                });
                channels.push({
                    page: pageNum,
                    channels: pageChannel
                });
            });
            channels.sort(function(x,y) {
                if (x.page < y.page) {
                    return -1;
                }
                if (x.page > y.page) {
                    return 1;
                }
                return 0;
            });
            fs.writeFile(path.join(config.jsonPath, 'channel.json'),JSON.stringify(channels), function(err) {
                if (err) {
                    return logger.log(err);
                }
                logger.log('channel.json write ok');
            });
        });

        pageUrls.forEach(function(pageUrl) {
            superagent.get(pageUrl)
              .set('Cookie', config.cookie)
              .end(function(err, res) {
                  if (err) {
                      return logger.log(err);
                  }
                  var sIndex = pageUrl.indexOf('&page=') + 6;
                  var eIndex = pageUrl.indexOf('&per');
                  var pageNum = Number(pageUrl.substring(sIndex, eIndex));
                  ep.emit('load_channel', [pageNum, res.text]);
              });
        });
    });
}

/*
function loadChanne() {
    var channelUrl = config.url + 'channel/list?wp';
    var pageUrls = [];
    superagent.get(channelUrl)
      .end(function(err, res) {
        if (err) {
            return console.log(err);
        }
        var $ = cheerio.load(res.text);
        var href = $('.pagination .active a').attr('href');
        var totalPageIndex = href.indexOf('-page=') + 6;
        var totalPage = Number(href.substring(totalPageIndex));
        for (var i=1; i<totalPage; i++) {
            var pageUrl = channelUrl + '&page=' + i + '&per-page=' + totalPage;
            pageUrls.push(pageUrl);
        }

        var ep = eventproxy();

        ep.after('load_channel', pageUrls.length, function(pages) {
            var channels = [];
            pages.forEach(function(page) {
                var pageNum = page[0];
                var pageHtml = page[1];
                var pageChannel = [];
                var $ = cheerio.load(pageHtml);
                $('.channel-cover-wp').each(function(i, e) {
                    var $e = $(e);
                    var channelName = $e.text().trim();
                    var picUrl = $e.find('img').attr('src');
                    var href = $e.find('a').attr('href');
                    var channelUrl = url.resolve(config.url, href);
                    pageChannel.push({
                        channelName: channelName,
                        channelUrl: channelUrl,
                        picUrl: picUrl
                    });
                });
                channels.push({
                    page:pageNum,
                    channels: pageChannel
                });
            });
            channels.sort(function(x,y) {
                if (x.page < y.page) {
                    return -1;
                }
                if (x.page > y.page) {
                    return 1;
                }
                return 0;
            });
            channels.forEach(function(channel) {
                console.log(channel.channels);
            });
        });

        pageUrls.forEach(function(pageUrl) {
            superagent.get(pageUrl)
              .set('Cookie', config.cookie)
              .end(function(err, res) {
                if (err) {
                    return console.log(err);
                }
                var sIndex = pageUrl.indexOf('&page=') + 6;
                var eIndex = pageUrl.indexOf('&per');
                var pageNum = Number(pageUrl.substring(sIndex, eIndex));
                ep.emit('load_channel', [pageNum, res.text]);
            });
        });

    });
}
*/

function downloadImage(url) {
    var imgName = url.substring(url.lastIndexOf('/'));
    var stream = fs.createWriteStream('static/img/' + imgName);
    var req = superagent.get(url);
    req.pipe(stream);
}

exports.loadChannel = loadChannel;
