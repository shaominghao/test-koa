/**
 * file
 * @author shaomh(hzshaominghao@netease.com)
 */
"use strict";
var EventEmitter = require('events').EventEmitter;
var koa = require('koa');

class Server extends EventEmitter{
    constructor(config) {
        super();
        this._config = config;

        this.init();
    }

    init(){
        console.log(
            '[%s.constructor] init server ...',
            this.constructor.name
        );
        this._app = koa();
        this._port= [this._config.port||'80'];

        this._app.use(function *(next) {
            var start = new Date;
            yield next;
            var ms = new Date-start;
            console.log('%s %s - %s', this.method, this.url, ms);
        });

        this._app.use(function *() {
            this.body = 'Hello World';
        });

    }

    use(mw) {
        if(Array.isArray(mw)) {
            mw.forEach(this.use, this);
            return;
        }
        this._app.use(mw);
    }

    start() {
        if(!this._server){
            console.log(
                '[%s.constructor] start server on port %s',
                this.constructor.name, this._port
            );
            this._server = this._app.listen.apply(this._app, this._port);
        }
    }

    stop() {
        if(!!this._server) {
            console.log(
                '[%s.constructor] stop server',
                this.constructor.name
            );
            this._server.close();
            delete this._server;
        }
    }
}

module.exports = Server;
