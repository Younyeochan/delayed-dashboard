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

exports.getDelayTrendOverF = (dt, cnt) => {
    return getDelayTrendOverFLocal(dt, cnt)
}


async function getDelayTrendOverFLocal (dt, cnt) {

    // let pseudoResult = [[],[],[]]
    // let start_i = parseInt(dt.slice(8,10))*4 + parseInt(dt.slice(10,12))/15;
    // for (let i=0; i<cnt; i++) {
    //     pseudoResult[0].push(Math.floor(Math.random() * 180) + 100);
    //     pseudoResult[1].push(Math.floor(Math.random() * 180) + 100);
    //     pseudoResult[2].push("00:00");
    // }
    // const endDt = dtUtil.deltaMinuteString(dt, -1*cnt*15);  
    // console.log('금일', dt, '금일 종료', endDt)
    // const weekBeforeDt = dtUtil.deltaDayString(dt, -7);
    // const weekBeforeEndDt = dtUtil.deltaMinuteString(dt, (-7*24*60) + (-1*cnt*15));  
    // console.log('일주전', weekBeforeDt, '일주전 종료', weekBeforeEndDt)
    // return Connection.createJsonResponse( true, 'N' + Constants.MESSAGE_SUCCESS, pseudoResult )    

    let jsonResult = []

    try {
        const fromDt = dtUtil.deltaMinuteString(dt, -1*cnt*15);  
        const dtWeek = dtUtil.deltaDayString(dt, -7);
        const fromDtWeek = dtUtil.deltaMinuteString(dt, (-7*24*60) + (-1*cnt*15));  
        console.log('금일 시작', fromDt, '금일 종료', dt)
        console.log('일주전 시작', fromDtWeek, '일주전 종료', dtWeek)

        for(let idx = 0; idx < 2; idx++) {

            let dtFrom = '';
            let dtEnd = '';

            if ( idx == 0 ) {
                dtFrom = fromDt;
                dtEnd = dt;
            } else {
                dtFrom = fromDtWeek;
                dtEnd = dtWeek;
            }

            let query =
                `
                SELECT *
                FROM 
                    (SELECT TO_CHAR(INT_CREDATE, 'YYYYMMDDHH24MI') AS DY, AVG(INT_DEL) AS DELAY
                    FROM SCS_L_INTRESULT
                    WHERE INT_LOS > 1
                        AND TO_CHAR(INT_CREDATE, 'YYYYMMDDHH24MI') >= '${dtFrom}' AND TO_CHAR(INT_CREDATE, 'YYYYMMDDHH24MI') <= '${dtEnd}'
                    GROUP BY TO_CHAR(INT_CREDATE, 'YYYYMMDDHH24MI')
                    ORDER BY TO_CHAR(INT_CREDATE, 'YYYYMMDDHH24MI') DESC)
                WHERE ROWNUM <= ${cnt}
            `

            console.log(query);

            let bindParams = []
            let result = await Connection.a_sendQuery( query, bindParams )

            if ( Connection.isEmpty( result ) ) {
                return Connection.createJsonResponse( false, Constants.MESSAGE_FAILED, jsonResult )
            } else {
                // let tmpResultDelay = Array.from({length: cnt}, () => -1);
                // let tmpResultHm = Array.from({length: cnt}, () => "");
                let tmpResultDelay = [];
                let tmpResultHm = [];

                for ( let i = 0; i < result.rows.length; i++ ) {                   
                    console.log(result.rows[i]);
                    // 시분에 해당하는 index에 저장 
                    // let hm = result.rows[i].DY;
                    // let hm_idx = 4 * parseInt(hm.slice(0,2)) + parseInt(hm.slice(2,4)) / 15;
                    tmpResultDelay.push(result.rows[i].DELAY);
                    tmpResultHm.push(result.rows[i].DY);
                } 

                jsonResult.push([tmpResultDelay, tmpResultHm])
            }
        }
        return Connection.createJsonResponse( true, 'N' + Constants.MESSAGE_SUCCESS, jsonResult )
    } catch ( e ) {
        console.log( ' ---- E: getDelayTrendOverF ----' )
        console.error( e )
        console.log( ' ---- E: getDelayTrendOverF ----' )
    }

}