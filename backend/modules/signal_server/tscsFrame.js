'use strict'

var moment = require('moment');

var tscsCfg   = require('./config');
var tscsConst = require('./constants');
//let constants = require('./constants');
var json = require('./tscs.json')

/*
typedef struct {
    uint8_t         stx1 ;          // Reserved: SCM_STX_FIRST
    uint8_t         stx2 ;          // Reserved: SCM_STX_SECOND
    uint8_t         src ;           // Source SCM_SYS_ID
    uint8_t         dst ;           // Destination SCM_SYS_ID
    uint8_t         current ;       // Current Frame Number
    uint8_t         total ;         // Total Frames
    uint8_t         seq ;           // Sequence Number (Incremental)
    uint8_t         kind ;          // SCM_KIND_ID
    uint8_t         opcode ;        // Operation Code
    uint8_t         command ;       // Command
    uint16_t        target ;        // Target Number
    uint32_t        dsize ;         // Size Of Data
    struct timeval  tv ;            // Current Time
} st_scm_head , * pst_scm_head ;
*/

exports.makeTscsHead = function(kind, command, target, dsize) {
    // let tscsHead = Buffer.alloc(tscsCfg.get('tscs_header_size'));
    let tscsHead = Buffer.alloc(json.tscs_header_size);

    tscsHead.fill(0);

    tscsHead.write('C');                 // 'C' : Reserved Character
    tscsHead.write('M', 1);              // 'M' : Reserved Character
    tscsHead.writeUInt8(tscsConst.MACHINE_ID_TERM, 2);           // src : 신호운영단말
    tscsHead.writeUInt8(tscsConst.MACHINE_ID_HOST, 3);           // dst : Host
    tscsHead.writeUInt8(kind, 7);        // kind (시스템 종류)
    tscsHead.writeUInt8(command, 8);
    tscsHead.writeUInt8(command, 9);     // command

    // if (config.get('signal_center_is_big_endian')) {
    if (tscsCfg.get('tscs_is_big_endian')) {
      tscsHead.writeUInt16BE(target, 10);              // target : Machine ID
      tscsHead.writeUInt32BE(dsize, 12);                   // dsize 4Byte
      //tscsHead.writeUInt32BE(parseInt(moment().format('X')), 20);    // Seconds
      tscsHead.writeDoubleBE(parseInt(moment().format('X')), 16);    // Seconds
      /* Added in: V12.0.0
      tscsHead.writeBigUInt64BE(parseInt(moment().format('X')), 16);    // Seconds
      */
    } else {
      tscsHead.writeUInt16LE(target, 10);              // target : Machine ID
      tscsHead.writeUInt32LE(dsize, 12);               // dsize 4Byte
      //tscsHead.writeUInt32LE(parseInt(moment().format('X')), 16);    // Seconds
      tscsHead.writeDoubleLE(parseInt(moment().format('X')), 16);    // Seconds
      /* Added in: V12.0.0
      tscsHead.writeBigUInt64LE(parseInt(moment().format('X')), 16);    // Seconds
      */
    }
    //console.log(`makeTscsHead( kind ${kind}, command ${command}, target ${target}, size ${dsize} )`);
    //console.log(tscsHead);
    return tscsHead;
}

exports.makeTscsFrame = function (kind, command, target, size, data) {
    //let tscsFrame = Buffer.alloc( tscsCfg.get('tscs_header_size') + tscsCfg.get('tscs_sa_info_size') * tscsCfg.get('tscs_sa_max') + tscsCfg.get('tscs_lc_info_size') * tscsCfg.get('tscs_lc_max') );
    let tscsFrame = Buffer.alloc(json.tscs_header_size + size);
    tscsFrame.fill(0)
    tscsFrame.write('C');                               // 'C' : Reserved Character
    tscsFrame.write('M', 1);                            // 'M' : Reserved Character
    tscsFrame.writeUInt8(tscsConst.MACHINE_ID_TERM, 2); // src : 신호운영단말
    tscsFrame.writeUInt8(tscsConst.MACHINE_ID_HOST, 3); // dst : Host
    tscsFrame.writeUInt8(kind, 7);                      // kind (시스템 종류)
    tscsFrame.writeUInt8(data[1], 8);                      // opcode
    tscsFrame.writeUInt8(command, 9);                   // command

    if (json.tscs_is_big_endian) {
      tscsFrame.writeUInt16BE(target, 10);                         // target : Machine ID
      tscsFrame.writeUInt32BE(size, 12);                           // size 4Byte
      tscsFrame.writeDoubleBE(parseInt(moment().format('X')), 16); // Seconds
    } else {
      tscsFrame.writeUInt16LE(target, 10);                         // target : Machine ID
      tscsFrame.writeUInt32LE(size, 12);                           // size 4Byte
      tscsFrame.writeDoubleLE(parseInt(moment().format('X')), 16); // Seconds
    }
    if (size) {
      console.log('size in if');
      for (let i = 0; i < size; i++)
        tscsFrame[json.tscs_header_size + i] = data[i];
    }
    console.log(`makeTscsFrame( kind ${kind}, command ${command}, target ${target}, size ${size} )`);
    // console.log(tscsFrame);
    return tscsFrame;
}

//module.exports = msg;
