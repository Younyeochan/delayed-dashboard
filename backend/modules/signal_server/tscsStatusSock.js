'use strict'

//import net from 'net';
var net       = require('net');

var tscsConst = require('./constants');
var tscsFrame = require('./tscsFrame');
var json = require('./tscs.json')

var tscsStatusSock = function(callback) {
    this.rxData = Buffer.alloc( (32 + 76 * 400 + 107 * 1024) );
    this.rxSize = 0;
    this.interval;
    this.socket;
    this.isConnect = false;
    this.isClose = false;
    this.callback = callback;
}                                                       

var method = tscsStatusSock.prototype;

method.connect = function() {
    this.socket = net.createConnection(json.tscs_status_port, json.tscs_host_inet, () => {
        this.isConnect = true;
        console.log('Connection To TSCS For Status Successfully.');
        this.interval = setInterval( () => {
            this.rxData.fill(0);
            this.rxSize = 0;
            var txBuf = tscsFrame.makeTscsHead(tscsConst.KIND_ALL, tscsConst.SCS_OP_SCS_MON_REQ, 0, 0);
            this.socket.write(txBuf);
        }, 1000 );
    }).on('data', (chunk) => {
        chunk.copy(this.rxData, this.rxSize);
        this.rxSize += chunk.byteLength;
        if(this.rxSize >= this.rxData.byteLength) {
            this.callback(this.rxData);
        }
    }).on('end', () => {
        console.log('Disconnected To TSCS For Status');
        this.reconnect();
    }).on('error', (err) => {
        console.log('Detected Error. Reconnect To TSCS For Status' + err);
        this.reconnect();
    });
}

method.isConnect = function() {
    return this.isConnect;
}

method.reconnect = function() {
    if (global.appClose) {
        clearInterval(this.interval);
        return;
    }

    if (this.isClose) {
        console.log('Disconnect To TSCS.');
    } else {
        this.isConnect = false;
        console.log('Close Connection. Retrying Connect ...');
        clearInterval(this.interval);
        // Re-open socket
        setTimeout( () => {
            this.connect();
            //func.fileLogServer('[send] command='+tscsConst.SCS_OP_STRING[tscsConst.SCS_OP_SCS_MON_REQ] + ',desc=ReConnect');
        }, 1000);
    }
}

method.disconnect = function() {
    if (this.isConnect == true)
        return;

    this.isClose = true;

    // Send Message
    var txBuf = tscsFrame.makeTscsHead(tscsConst.KIND_ALL, tscsConst.SCS_OP_DISCONNECT, 0, 0);

    this.socket.write(txBuf, () => {
        //func.fileLogServer('[send] command='+tscsConst.SCS_OP_STRING[tscsConst.SCS_OP_DISCONNECT]);
        this.isConnect = false;
        if (typeof callback !== 'undefined') callback();
    });
}

method.clearInterval = function() {
    clearInterval(this.interval);
    this.isClose = true;
    this.disconnect();
}
module.exports = tscsStatusSock;

// EOF tscsStatusSock.js
