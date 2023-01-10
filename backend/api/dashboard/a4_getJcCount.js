/**
 * @API
 * @desc 
 * @module 
 * @path 
 * @function 
 * @param 
 */

const Connection = require( '../../db/Connection' )
const Constants = require( '../../modules/Constants' )

exports.getJcCount = (dt) => {
    return getJcCountLocal(dt)
}

async function getJcCountLocal (dt) {

    // let pseudoResult = []; 
    // pseudoResult.push(Math.floor(Math.random() * 50) + 40);
    // pseudoResult.push(Math.floor(Math.random() * 30) + 20);
    // pseudoResult.push(Math.floor(Math.random() * 20) + 10);
    // return Connection.createJsonResponse( true, 'N' + Constants.MESSAGE_SUCCESS, pseudoResult )   

    let jsonResult = []; 

    try {
        const query =
            `
            SELECT NVL(AA.ICNT, -1) AS CNT1, NVL(BB.ICNT, -1) AS CNT2, NVL(CC.ICNT, -1) AS CNT3
            FROM
                (SELECT COUNT(DISTINCT(INT_LCNO)) AS ICNT
                FROM SCS_M_INTLC
                WHERE INT_REGFLAG = 1
                UNION ALL
                SELECT NULL AS ICNT
                    FROM DUAL
                    WHERE NOT EXISTS (
                        SELECT COUNT(DISTINCT(INT_LCNO)) AS ICNT
                        FROM SCS_M_INTLC
                        WHERE INT_REGFLAG = 1
                    )
                ) AA,
                (SELECT COUNT(DISTINCT(INT_LCNO)) AS ICNT
                FROM SCS_M_VC_INTLC
                WHERE VC_USE_YN = 1
                UNION ALL
                SELECT NULL AS ICNT
                    FROM DUAL
                    WHERE NOT EXISTS (
                        SELECT COUNT(DISTINCT(INT_LCNO)) AS ICNT
                        FROM SCS_M_VC_INTLC
                        WHERE VC_USE_YN = 1
                    )
                ) BB,
                (SELECT COUNT(DISTINCT(smi.INT_LCNO)) AS ICNT
                FROM SCS_M_INTLC smi, SCS_L_INTRESULT sli
                WHERE smi.INT_REGFLAG = 1 AND sli.INT_DEL > 0
                UNION ALL
                SELECT NULL AS ICNT
                    FROM DUAL
                    WHERE NOT EXISTS (
                        SELECT COUNT(DISTINCT(smi.INT_LCNO)) AS ICNT
                        FROM SCS_M_INTLC smi, SCS_L_INTRESULT sli
                        WHERE smi.INT_REGFLAG = 1 AND sli.INT_DEL > 0
                    )
                ) CC
        `

        console.log(query);

        const bindParams = []
        const result = await Connection.a_sendQuery( query, bindParams )

        if ( Connection.isEmpty( result ) ) {
            return Connection.createJsonResponse( false, Constants.MESSAGE_FAILED, jsonResult )
        } else {
            for ( let i = 0; i < result.rows.length; i++ ) {
                console.log(result.rows[i]);
                jsonResult.push( result.rows[i].CNT1 );
                jsonResult.push( result.rows[i].CNT2 );
                jsonResult.push( result.rows[i].CNT3 );
            }
            return Connection.createJsonResponse( true, result.rows.length + Constants.MESSAGE_SUCCESS, jsonResult )
        }

    } catch ( e ) {
        console.log( ' ---- E: getJcCount ----' )
        console.error( e )
        console.log( ' ---- E: getJcCount ----' )
    }

}