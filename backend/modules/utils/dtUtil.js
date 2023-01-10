'use strict'

var moment = require('moment');

const dtUtil = {}

// YYYYMMDD -> YYYY-MM-DD 변환
dtUtil.convertYMD = function( strYMD ) {
    return strYMD.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
}

// hhmmss -> hh:mm:ss 변환
dtUtil.convertHMS = function( strHMS ) {
    return strHMS.replace(/(\d{2})(\d{2})(\d{2})/g, '$1:$2:$3');
}

// YYYYMMDDhhmmss -> YYYY-MM-DD hh:mm:ss 변환
dtUtil.convertYMDHMS = function( strYMDHMS ) {
    if (strYMDHMS.length == 'yyyymmddhhmm'.length)
        strYMDHMS += '00';
    else if (strYMDHMS.length == 'yyyymmdd'.length)
        strYMDHMS += '000000';

    const ymd = strYMDHMS.slice(0,8);
    const hms = strYMDHMS.slice(8,14);
    return this.convertYMD(ymd) + ' ' + this.convertHMS(hms);
}

// YYYYMMDDhhmmss을 Date()로 변환
dtUtil.getDate = function( strYMDHMS ) {
    return new Date( this.convertYMDHMS(strYMDHMS) );
}

function padYmdhms(strYMDHMS) {
    if (strYMDHMS.length == 'yyyymmddhhmm'.length)
        strYMDHMS += '00';
    else if (strYMDHMS.length == 'yyyymmdd'.length)
        strYMDHMS += '000000';    
    return strYMDHMS;
}

function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

// Date()를 YYYYMMDDhhmmss로 변환
dtUtil.getDateString = function( date ) {
    var yyyy = date.getFullYear().toString();
    var MM = pad(date.getMonth() + 1,2);
    var dd = pad(date.getDate(), 2);
    var hh = pad(date.getHours(), 2);
    var mm = pad(date.getMinutes(), 2)
    var ss = pad(date.getSeconds(), 2)
    return yyyy +  MM + dd+  hh + mm + ss;;
}


// Date()를 deltaSecond 시간 이동
dtUtil.deltaSecond = function( date, deltaSec ) {
    let deltaDate = date.getTime() + deltaSec * 1000;
    return new Date(deltaDate);
}


// Date()를 deltaDay 시간 이동
dtUtil.deltaDay = function( date, deltaDay ) {
    let deltaDate = date.getTime() + deltaDay * 24 * 60 * 60 * 1000;
    return new Date(deltaDate);
}

// YYYYMMDDhhmmss를 deltaDay 시간 이동 후 YYYYMMDDhhmmss로 리턴
dtUtil.deltaDayString = function( strYMDHMS, deltaDay ) {
    let date = this.getDate( padYmdhms(strYMDHMS) );
    let deltaDate = this.deltaDay(date, deltaDay);
    return this.getDateString(deltaDate);
}

// YYYYMMDDhhmmss를 deltaMinutes 시간 이동 후 YYYYMMDDhhmmss로 리턴 
dtUtil.deltaMinuteString = function( strYMDHMS, deltaMinutes ) {
    let date = this.getDate( padYmdhms(strYMDHMS) );
    let deltaDate = this.deltaSecond(date, deltaMinutes*60);
    return this.getDateString(deltaDate);
}


module.exports = dtUtil