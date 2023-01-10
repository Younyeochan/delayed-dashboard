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

exports.getDelayTop = (dt) => {
    return getDelayTopLocal(dt)
}

async function getDelayTopLocal (dt) {

    // let pseudoResult = [[],[],[]]
    // for (let i=0; i<10; i++) {
    //     pseudoResult[0].push(Math.floor(Math.random() * 200) + 100);
    //     pseudoResult[1].push(Math.floor(Math.random() * 180) + 100);
    //     pseudoResult[2].push('교차로'+i);
    // }
    // pseudoResult[0] = pseudoResult[0].sort().reverse();    
    // return Connection.createJsonResponse( true, 'N' + Constants.MESSAGE_SUCCESS, pseudoResult )
    
    let jsonResult = [[],[],[]]

    try {
        const query =
            `
            SELECT AA.INT_LCNO AS LCNO, BB.INT_NAME AS NAME, AA.DELAY
            FROM (
                    SELECT * 
                    FROM (
                        SELECT INT_LCNO, AVG(INT_DEL) AS DELAY
                        FROM SCS_L_INTRESULT
                        WHERE TO_CHAR(INT_CREDATE, 'YYYYMMDDHH24MI') = '${dt}'
                        GROUP BY INT_LCNO
                        ORDER BY AVG(INT_DEL) DESC
                    ) 
                    WHERE ROWNUM <= 10
                ) AA, SCS_M_INTLC BB
            WHERE
                AA.INT_LCNO = BB.INT_LCNO
        `

        console.log(query);

        const bindParams = []
        const result = await Connection.a_sendQuery( query, bindParams )

        if ( Connection.isEmpty( result ) ) {
            return Connection.createJsonResponse( false, Constants.MESSAGE_FAILED, jsonResult )
        } else {
            for ( let i = 0; i < result.rows.length; i++ ) {
                console.log(result.rows[i]);
                jsonResult[0].push( result.rows[i].LCNO );
                jsonResult[1].push( result.rows[i].DELAY );
                jsonResult[2].push( result.rows[i].NAME );
            }

            return Connection.createJsonResponse( true, result.rows.length + Constants.MESSAGE_SUCCESS, jsonResult )
        }

    } catch ( e ) {
        console.log( ' ---- E: getDelayTop ----' )
        console.error( e )
        console.log( ' ---- E: getDelayTop ----' )
    }

}