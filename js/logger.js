'use strict'

/**
 *@description 日志类，通过console显示，可以通过forever记录为文本
 *@author luob
 *version 1.0.0
 *@update 2015-11-10
*/

var tools = require("./tools");
var debug = false;//是否调试状态，调试状态下会显示debug类型的日志

exports.enabledebug = function() {
    debug = true;
}
exports.disabledebug = function() {
    debug = false;
}

exports.log = function(msg) {
    console.log(getDateTimeString() + " " + msg);
}

exports.debug = function(msg) {
    if (debug) {
        console.log("DEBUG: " + getDateTimeString() + " " + msg);
    }
}

exports.error = function(msg) {
    console.log("ERROR: " + getDateTimeString() + " " + msg);
}

//获取当前日期时间字符串
function getDateTimeString(d) {
    if (!d) { 
        d = new Date();
    }
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth() + 1).toString();
    var dd = d.getDate().toString();
    var hh = d.getHours().toString();
    var mi = d.getMinutes().toString();
    var ss = d.getSeconds().toString();
    return yyyy + "-" + (mm[1] ? mm : "0" + mm) + "-" + (dd[1] ? dd : "0" + dd) + " " + (hh[1] ? hh : "0" + hh) + ":" + (mi[1] ? mi : "0" + mi) + ":" + (ss[1] ? ss : "0" + ss);
}

//获取当前日期字符串
function getDateString(d) {
    if (!d) { 
        d = new Date();
    }
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth() + 1).toString();
    var dd = d.getDate().toString();
    return yyyy + "-" + (mm[1] ? mm : "0" + mm) + "-" + (dd[1] ? dd : "0" + dd);
}

//获取当前日期字符串
function getCNDateString(d) {
    if (!d) { 
        d = new Date();
    }
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth() + 1).toString();
    var dd = d.getDate().toString();
    return yyyy + "年" + mm + "月" + dd + "日";
}
