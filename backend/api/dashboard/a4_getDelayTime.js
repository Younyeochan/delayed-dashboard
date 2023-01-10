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

exports.getDelayTime = (dt) => {
    return getDelayTimeLocal(dt)
}

async function getDelayTimeLocal (dt) {

    // let pseudoResult = [];
    // for (let i=0; i<100; i++) {
    //     let k = String(i);
    //     let v = Math.floor(Math.random() * 180) + 100;
    //     let data = {}
    //     data[k] = v; 
    //     pseudoResult.push( data );
    // }
    // return Connection.createJsonResponse( true, 'N' + Constants.MESSAGE_SUCCESS, pseudoResult )

    let jsonResult = [];

    try {
        const query =
            `
            SELECT INT_LCNO AS LCNO, INT_LOS AS LOS, INT_DEL AS DELAY
            FROM SCS_L_INTRESULT 
            WHERE TO_CHAR(INT_CREDATE, 'YYYYMMDDHH24MI') = '${dt}'
        `

        console.log(query);

        const bindParams = []
        const result = await Connection.a_sendQuery( query, bindParams )

        if ( Connection.isEmpty( result ) ) {
            return Connection.createJsonResponse( false, Constants.MESSAGE_FAILED, jsonResult )
        } else {
            for ( let i = 0; i < result.rows.length; i++ ) {
                console.log(result.rows[i]);

                let delay = {};
                delay[result.rows[i].LCNO] = result.rows[i].DELAY;
                jsonResult.push(delay);
            }
            return Connection.createJsonResponse( true, result.rows.length + Constants.MESSAGE_SUCCESS, jsonResult )
        }

    } catch ( e ) {
        console.log( ' ---- E: getDelayTime ----' )
        console.error( e )
        console.log( ' ---- E: getDelayTime ----' )
    }

}