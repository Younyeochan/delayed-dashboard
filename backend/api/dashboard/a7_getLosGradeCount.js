/**
 * @API
 * @desc 
 * @module 
 * @path 
 * @function 
 * @param 
 */

const dtUtil = require('../../modules/utils/dtUtil')
const Connection = require( '../../db/Connection' )
const Constants = require( '../../modules/Constants' )

exports.getLosGradeCount = (dt, cnt) => {
    return getLosGradeCountLocal(dt, cnt)
}

async function getLosGradeCountLocal (dt, cnt) {

    // let pseudoResult = [];
    // for (let i=0; i<cnt; i++) {
    //     let tmpData = [];
    //     for(let j=0; j<8; j++ ) {
    //         tmpData.push(Math.floor(Math.random() * 180) + 100);
    //     }
    //     let sumTmpData = tmpData.reduce((accumulator, value) => {
    //         return accumulator + value;
    //       }, 0);
    //     for (let i=0; i<8; i++) {
    //         tmpData[i] = Math.floor(100 * tmpData[i] / sumTmpData);
    //     }
    //     pseudoResult.push(tmpData);
    // }
    // return Connection.createJsonResponse( true, 'N' + Constants.MESSAGE_SUCCESS, jsonResult )


    let jsonResult = [];
    for (let idx=0; idx<cnt; idx++) {
        jsonResult.push( Array.from({length: 8}, () => 0));
    }
    
    const fromDt = dtUtil.deltaMinuteString(dt, -1*cnt*15);  
    console.log('요청일', dt.slice(0,8), '시간', dt.slice(8,14))
    console.log('종료일', fromDt.slice(0,8), '시간', fromDt.slice(8,14))

    try {
        
        const query =
            `           
            SELECT TO_CHAR(INT_CREDATE, 'YYYYMMDDHH24MI') AS DY, INT_LOS AS LOS, COUNT(INT_LOS) AS CNT
            FROM SCS_L_INTRESULT
            WHERE 1=1
                AND TO_CHAR(INT_CREDATE, 'YYYYMMDDHH24MI') >= '${fromDt}' AND TO_CHAR(INT_CREDATE, 'YYYYMMDDHH24MI') <= '${dt}'
            GROUP BY INT_LOS, TO_CHAR(INT_CREDATE, 'YYYYMMDDHH24MI')
            ORDER BY TO_CHAR(INT_CREDATE, 'YYYYMMDDHH24MI')
        `

        console.log(query);

        const bindParams = []
        const result = await Connection.a_sendQuery( query, bindParams )

        if ( Connection.isEmpty( result ) ) {
            return Connection.createJsonResponse( false, Constants.MESSAGE_FAILED, jsonResult )
        } else {
            let tmpResult = [];
            let resultDt = {};
            for (let idx=0; idx<cnt; idx++) {
                tmpResult.push( Array.from({length: 8}, () => 0));
            }

            let hmStart = fromDt.slice(8,14); 
            let arrIdxStart = 4 * parseInt(hmStart.slice(0,2)) + parseInt(hmStart.slice(2,4)) / 15 + 1;

            for ( let i = 0; i < result.rows.length; i++ ) {
                let hm = result.rows[i].DY.slice(8,14); 
                let arrIdx = -1;
                if ( dt.slice(0,8) == fromDt.slice(0,8) ) {
                    arrIdx = 4 * parseInt(hm.slice(0,2)) + parseInt(hm.slice(2,4)) / 15 - arrIdxStart;
                } else {
                    arrIdx = 0;
                }
                
                console.log(arrIdx, result.rows[i]);
                tmpResult[arrIdx][result.rows[i].LOS] = result.rows[i].CNT;
                resultDt[result.rows[i].DY] = result.rows[i].DY;
            }

            // 백분율로 계산
            for ( let i = 0; i < cnt; i++ ) {
                let sumResult = tmpResult[i].reduce((accumulator, value) => {
                    return accumulator + value;
                }, 0);

                if (sumResult == 0 )
                    continue;

                for (let j = 0; j < 8; j++ ) {
                    jsonResult[i][j] = 100 * tmpResult[i][j] / sumResult;  
                } 
            }

            // 일자만 별도 추출 제공
            let dataDt = [];
            for(key in resultDt){
                dataDt.push(key);
            }
            return Connection.createJsonResponse( true, cnt + Constants.MESSAGE_SUCCESS, [jsonResult, dataDt] )
        }

    } catch ( e ) {
        console.log( ' ---- E: getLosGradeCount ----' )
        console.error( e )
        console.log( ' ---- E: getLosGradeCount ----' )
    }

}