/**
 * file
 * @author shaomh(hzshaominghao@netease.com)
 */
"use strict";

var app = new (require('./Server'))({
    port : 3000
});


app.start();