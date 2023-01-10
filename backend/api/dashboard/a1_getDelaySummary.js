/**
 * @API : 1
 * @desc 
 * @module 
 * @path 
 * @function 
 * @param 
 */

const dtUtil = require('../../modules/utils/dtUtil')
const Connection = require( '../../db/Connection' )
const Constants = require( '../../modules/Constants' )
const logger = require("../../logger/winstonLogger");



exports.getDelaySummary = (dt) => {
    return getDelaySummaryLocal(dt)
}

async function getDelaySummaryLocal (dt) {

    // let pseudoResult = [];
    // for(let i=0; i<4; i++) {
    //     let r = Math.floor(Math.random() * 100) + 50;
    //     pseudoResult.push(r);
    // }
    // return Connection.createJsonResponse( true, 'N' + Constants.MESSAGE_SUCCESS, pseudoResult )

    const dt1 = dt;
    const dt2 = dt.slice(0,8);
    const dt3 = dtUtil.deltaDayString(dt, -7).slice(0,8);
    const dt4 = dtUtil.deltaDayString(dt, -14).slice(0,8);    
    console.log('요청일', dt2, '1주전', dt3, '2주전', dt4);

    let jsonResult = [];

    try {
        const query =
            `
            SELECT NVL(AA.DELAY, -1) AS D1, NVL(BB.DELAY, -1) AS D2, NVL(CC.DELAY, -1) AS D3, NVL(DD.DELAY, -1) AS D4
            FROM (
                SELECT CAST(AVG(INT_DEL) AS int) AS DELAY
                FROM SCS_L_INTRESULT
                WHERE TO_CHAR(INT_CREDATE, 'YYYYMMDDHH24MI') = '${dt1}'
                GROUP BY TO_CHAR(INT_CREDATE, 'YYYYMMDDHH24MI')
                UNION ALL 
                SELECT NULL AS DELAY
                FROM DUAL 
                WHERE NOT EXISTS (
                    SELECT CAST(AVG(INT_DEL) AS int) AS DELAY
                    FROM SCS_L_INTRESULT
                    WHERE TO_CHAR(INT_CREDATE, 'YYYYMMDDHH24MI') = '${dt1}'
                    GROUP BY TO_CHAR(INT_CREDATE, 'YYYYMMDDHH24MI')
                )                
            ) AA,
            (
                SELECT CAST(AVG(INT_DEL) AS int) AS DELAY
                FROM SCS_L_INTRESULT
                WHERE TO_CHAR(INT_CREDATE, 'YYYYMMDD') = '${dt2}'
                GROUP BY TO_CHAR(INT_CREDATE, 'YYYYMMDD')
                UNION ALL 
                SELECT NULL AS DELAY
                FROM DUAL 
                WHERE NOT EXISTS (
                    SELECT CAST(AVG(INT_DEL) AS int) AS DELAY
                    FROM SCS_L_INTRESULT
                    WHERE TO_CHAR(INT_CREDATE, 'YYYYMMDD') = '${dt2}'
                    GROUP BY TO_CHAR(INT_CREDATE, 'YYYYMMDD')
                )                
            ) BB,
            (
                SELECT CAST(AVG(INT_DEL) AS int) AS DELAY
                FROM SCS_L_INTRESULT
                WHERE TO_CHAR(INT_CREDATE, 'YYYYMMDD') = '${dt3}'
                GROUP BY TO_CHAR(INT_CREDATE, 'YYYYMMDD')
                UNION ALL 
                SELECT NULL AS DELAY
                FROM DUAL 
                WHERE NOT EXISTS (
                    SELECT CAST(AVG(INT_DEL) AS int) AS DELAY
                    FROM SCS_L_INTRESULT
                    WHERE TO_CHAR(INT_CREDATE, 'YYYYMMDD') = '${dt3}'
                    GROUP BY TO_CHAR(INT_CREDATE, 'YYYYMMDD')
                )                
            ) CC,
            (
                SELECT CAST(AVG(INT_DEL) AS int) AS DELAY
                FROM SCS_L_INTRESULT
                WHERE TO_CHAR(INT_CREDATE, 'YYYYMMDD') = '${dt4}'
                GROUP BY TO_CHAR(INT_CREDATE, 'YYYYMMDD')
                UNION ALL 
                SELECT NULL AS DELAY
                FROM DUAL 
                WHERE NOT EXISTS (
                    SELECT CAST(AVG(INT_DEL) AS int) AS DELAY
                    FROM SCS_L_INTRESULT
                    WHERE TO_CHAR(INT_CREDATE, 'YYYYMMDD') = '${dt4}'
                    GROUP BY TO_CHAR(INT_CREDATE, 'YYYYMMDD')
                )
            ) DD
        `

        console.log(query);
        
        const bindParams = []
        const result = await Connection.a_sendQuery( query, bindParams )

        if ( Connection.isEmpty( result ) ) {

            return Connection.createJsonResponse( false, Constants.MESSAGE_FAILED, jsonResult )

        } else {
            for ( let i = 0; i < result.rows.length; i++ ) {
                console.log(result.rows[i]);
                jsonResult.push( result.rows[i].D1 );
                jsonResult.push( result.rows[i].D2 );
                jsonResult.push( result.rows[i].D3 );
                jsonResult.push( result.rows[i].D4 );
            }

            return Connection.createJsonResponse( true, result.rows.length + Constants.MESSAGE_SUCCESS, jsonResult )
        }

    } catch ( e ) {
        console.log( ' ---- E: getDelaySummary ----' )
        console.error( e )
        console.log( ' ---- E: getDelaySummary ----' )
    }

}