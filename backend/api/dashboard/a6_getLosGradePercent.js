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

exports.getLosGradePercent = (dt) => {
    return getLosGradePercentLocal(dt)
}

async function getLosGradePercentLocal (dt) {

    // let pseudoResult = []
    // let tmpData = [];
    // for (let i=0; i<8; i++) {
    //     tmpData.push(Math.floor(Math.random() * 180) + 100);
    // }
    // let sumTmpData = tmpData.reduce((accumulator, value) => {
    //     return accumulator + value;
    //   }, 0);
    // for (let i=0; i<8; i++) {
    //     pseudoResult.push(Math.floor(100 * tmpData[i] / sumTmpData));
    // }
    // return Connection.createJsonResponse( true, 'N' + Constants.MESSAGE_SUCCESS, pseudoResult )

    let jsonResult = []

    try {
        const query =
            `
            SELECT INT_LOS AS LOS, COUNT(INT_LOS) AS CNT
            FROM SCS_L_INTRESULT
            WHERE TO_CHAR(INT_CREDATE, 'YYYYMMDD') = '${dt}'
            GROUP BY INT_LOS 
            ORDER BY INT_LOS ASC
        `

        console.log(query);

        const bindParams = []
        const result = await Connection.a_sendQuery( query, bindParams )

        if ( Connection.isEmpty( result ) ) {
            return Connection.createJsonResponse( false, Constants.MESSAGE_FAILED, jsonResult )
        } else {
            let tmpResult = Array.from({length: 8}, () => 0);
            jsonResult = Array.from({length: 8}, () => 0);

            for ( let i = 0; i < result.rows.length; i++ ) {
                console.log(result.rows[i]);
                tmpResult[result.rows[i].LOS] = result.rows[i].CNT;
            }

            let sumResult = tmpResult.reduce((accumulator, value) => {
                return accumulator + value;
            }, 0);

            for (let i=0; i<8; i++) {
                jsonResult[i] = 100 * tmpResult[i] / sumResult;  
            }    

            return Connection.createJsonResponse( true, result.rows.length + Constants.MESSAGE_SUCCESS, jsonResult )
        }

    } catch ( e ) {
        console.log( ' ---- E: getLosGradePercent ----' )
        console.error( e )
        console.log( ' ---- E: getLosGradePercent ----' )
    }
}