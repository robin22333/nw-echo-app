try {
    var gui = require('nw.gui');
    var fs = require('fs');
    var win = gui.Window.get();
} catch(e) {
    console.log(e);
}

/*
var vm = new Vue({
    el: '#container',
    data: {
        channels:[{
            channelName: '3D',
            channelUrl: 'http://www.app-echo.com/channel/1091',
            picUrl: 'http://kibey-echo.b0.upaiyun.com/poster/2014/10/22/c7802b47b7b511f2.jpg'
        }]
    }
});
*/

var str = '';
str += '<ul class="channel-list cf">';
str += '  <li>';
str += '    <div class="channel-cover-wp">';
str += '      <img src="http://kibey-echo.b0.upaiyun.com/poster/2014/10/22/c7802b47b7b511f2.jpg" />';
str += '      <div class="mask"></div>';
str += '      <h3>3D</h3>';
str += '      <a href="player.html"></a>';
str += '    </div>';
str += '  </li>';
str += '</ul>';

//关闭
$('#close').on('click',function() {
    win.close();
});

setTimeout(function() {
  $('.channel').html(str);
}, 300);
