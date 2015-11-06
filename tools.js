'use strict'

var superagent = require('superagent')
  , cheerio = require('cheerio')
  , eventproxy = require('eventproxy')
  , url = require('url')
  , config = require('./config');

function loadChannel() {
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
//console.log(pageUrls);
        var ep = eventproxy();

        ep.after('load_channel', pageUrls.length, function(pages) {
            var channels = [];
            pages.forEach(function(page) {
                var pageUrl = page[0];
                var sIndex = pageUrl.indexOf('&page=') + 6;
                var eIndex = pageUrl.indexOf('&per');
                var pageNum = Number(pageUrl.substring(sIndex, eIndex));
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
                ep.emit('load_channel', [pageUrl, res.text]);
            });
        });

    });
}

exports.loadChannel = loadChannel;
