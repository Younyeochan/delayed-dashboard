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

exports.getLosTrend = (dt) => {
    return getLosTrendLocal(dt)
}

async function getLosTrendLocal (dt) {

    // let pseudoResult = [[],[]];
    // for (let i=0; i<96; i++) {
    //     pseudoResult[0].push(Math.floor(Math.random() * 8));
    //     if( i<50 ) {
    //         pseudoResult[1].push(Math.floor(Math.random() * 8));
    //     } else {
    //         pseudoResult[1].push(-1);
    //     }
    // }
    // const today = dt.slice(0,8);
    // const week_before = dtUtil.deltaDayString(dt, -7).slice(0,8);  
    // console.log('요청일', today, '1주전', week_before);
    // return Connection.createJsonResponse( true, '96' + Constants.MESSAGE_SUCCESS, pseudoResult )

    const dtToday = dt.slice(0,8);
    const dtWeekBefore = dtUtil.deltaDayString(dt, -7).slice(0,8);;

    let jsonResult = [];

    try {
        for(let idx = 0; idx < 2; idx++) {
            let jsonResultPart = Array.from({length: 96}, () => -1);

            let dtThis = '';
            if ( idx == 0 )
                dtThis = dtToday;
            else
                dtThis = dtWeekBefore;

            let query =
                `
                SELECT TO_CHAR(INT_CREDATE, 'HH24MI') AS DY, CAST(AVG(INT_LOS) AS int) AS LOS
                FROM SCS_L_INTRESULT
                WHERE 1=1 AND TO_CHAR(INT_CREDATE, 'YYYYMMDD') = '${dtThis}'
                GROUP BY TO_CHAR(INT_CREDATE, 'HH24MI')
                ORDER BY TO_CHAR(INT_CREDATE, 'HH24MI') ASC
            `

            console.log(query);

            let bindParams = []
            let result = await Connection.a_sendQuery( query, bindParams )
    
            if ( Connection.isEmpty( result ) ) {
                return Connection.createJsonResponse( false, Constants.MESSAGE_FAILED, jsonResult )
            } else {
                for ( let i = 0; i < result.rows.length; i++ ) {
                    // 시분에 해당하는 index에 저장 
                    let hm = result.rows[i].DY;
                    let hm_idx = 4 * parseInt(hm.slice(0,2)) + parseInt(hm.slice(2,4)) / 15;
                    console.log(hm_idx, result.rows[i].DY, result.rows[i].LOS); 

                    jsonResultPart[hm_idx] = result.rows[i].LOS;
                }

                jsonResult.push(jsonResultPart);
            }
        }

        return Connection.createJsonResponse( true, '96' + Constants.MESSAGE_SUCCESS, jsonResult )

    } catch ( e ) {
        console.log( ' ---- E: getLosTrend ----' )
        console.error( e )
        console.log( ' ---- E: getLosTrend ----' )
    }

}