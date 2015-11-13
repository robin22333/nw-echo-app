try {
    var gui = require('nw.gui');
    var fs = require('fs');
    var win = gui.Window.get();
} catch(e) {
    console.log(e);
}


//关闭
$('#close').on('click',function() {
    win.close();
});

setTimeout(function() {
    alert('aaa');
}, 300);
