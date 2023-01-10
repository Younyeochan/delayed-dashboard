/**
 * @API
 * @desc 신호등 정보 가져오기
 * @module ~/backend/api/map/lc-traffic-light
 * @path map/lc-traffic-light
 * @function getLcTrafficLight()
 * @param
 */

const Connection = require( "../../db/Connection" )
const Constants = require( "../../modules/Constants" )

exports.getLcTrafficLight = ( lcNo ) => {
    return getLcTrafficLightLocal( lcNo )
}

async function getLcTrafficLightLocal ( lcNo ) {
    let jsonResult = []

    try {
        const query = `
            SELECT
                INT_LCNO,
                INT_TLNO,
                INT_TL_LAT,
                INT_TL_LNG,
                INT_AR_LAT,
                INT_AR_LNG,
                INT_AR_ANGLE,
                INT_TL_DIR,
                INT_TL_USE_YN,
                INT_LCNO_N
            FROM
                SCS_M_INTTRAFFICLIGHT
            WHERE
                INT_LCNO = ${ lcNo }
            ORDER BY
                INT_TLNO
        `

        const bindParams = []
        const result = await Connection.a_sendQuery( query, bindParams )

        if ( Connection.isEmpty( result ) ) {
            return Connection.createJsonResponse( false, Constants.MESSAGE_FAILED, jsonResult )
        } else {

            let trafficLenght = 0

            for ( let i = 0; i < result.rows.length; i++ ) {
                if ( result.rows[ i ].INT_TL_USE_YN === 1 && result.rows[ i ].INT_LCNO_N !== null ) {

                    trafficLenght += 1

                    jsonResult.push( {
                        lcNo: result.rows[ i ].INT_LCNO,
                        tlNo: result.rows[ i ].INT_TLNO,
                        tlLat: result.rows[ i ].INT_TL_LAT,
                        tlLng: result.rows[ i ].INT_TL_LNG,
                        arLat: result.rows[ i ].INT_AR_LAT,
                        arLng: result.rows[ i ].INT_AR_LNG,
                        arAngle: parseInt( result.rows[ i ].INT_AR_ANGLE ),
                        dir: result.rows[ i ].INT_TL_DIR,
                        isUsed: result.rows[ i ].INT_TL_USE_YN,
                        nextLcNo: result.rows[ i ].INT_LCNO_N
                    } )
                }
            }



            return Connection.createJsonResponse( true, trafficLenght + Constants.MESSAGE_SUCCESS, jsonResult )
        }
    } catch ( e ) {
        console.log( " ---- E: getLcTrafficLight ----" )
        console.error( e )
        console.log( " ---- E: getLcTrafficLight ----" )
    }
}
