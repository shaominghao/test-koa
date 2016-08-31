/**
 * file
 * @author shaomh(hzshaominghao@netease.com)
 */
"use strict";

var app = new (require('./server/arch/Server'))({
    port: 3000,
    routes : require('./server/config/router.json'),
    filters: require('./server/config/filter.json'),
    roots: {
        "webPath"    : "/server/controller/web/",
        "apiPath"    : "/server/controller/api/",
        "filterPath" : "/server/filter/"
    }
});


app.start();