let dtUtil   = require('../modules/utils/dtUtil');

let ymd = '20230111';
let hms = '231900';

// console.log(dtUtil.convertYMD(ymd), dtUtil.convertHMS(hms), dtUtil.convertYMDHMS(ymd+hms));

let dt = dtUtil.getDate(ymd+hms);

// console.log( dt, dtUtil.deltaSecond(dt, 60) );
// console.log( dt, dtUtil.deltaDay(dt, 7) );

// const d1 = '20220527';
// const d3 = dtUtil.deltaDayString(d1, -7);
// const d4 = dtUtil.deltaDayString(d1, -14);    
// console.log(d1.slice(0,8), d3.slice(0,8), d4.slice(0,8));

// const dd1 = '20220527001500';
// const dd3 = dtUtil.deltaMinuteString(dd1, -30); 
// console.log(dd1.slice(0,8), dd1.slice(8,14))
// console.log(dd3.slice(0,8), dd3.slice(8,14))

// let dt_idx = [ '0000', '0015', '0030', '0045', '0100', '2300', '2315', '2330', '2345', '2400']
// dt_idx.forEach(function(d) {
//     let h = parseInt(d.slice(0,2));
//     let m = parseInt(d.slice(2,4));
//     console.log(h, m, h*4 + m/15);
// });


for (let i=0; i<96; i++) {
    let hh = parseInt(i / 4);
    let mm = 15*(i % 4);
    console.log(i, hh, mm);
}