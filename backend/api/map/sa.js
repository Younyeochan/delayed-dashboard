/**
 * @API
 * @desc frontend에서 현재 보이는 바운더리 값에 해당하는 sa 목록만 불러오기
 * @module ~/backend/api/map/sa
 * @path map/sa
 * @function getMapSaList()
 * @param { Array } params.bounday : front에서 보여지고 있는 화면의 각 4 각에 대한 위,경도값
 * @return { Object } jsonResult
 */

const Connection = require( '../../db/Connection' )
const Constants = require( '../../modules/Constants' )

exports.getMapSaList = () => {
    return getMapSaListLocal()
}

async function getMapSaListLocal () {

    let jsonResult = []

    try {

        const query = ``
        const bindParams = []
        const result = await Connection.a_sendQuery( query, bindParams )

        if ( Connection.isEmpty( result ) ) {

            return Connection.createJsonResponse( false, Constants.MESSAGE_FAILED, jsonResult )

        } else {

            for ( let i = 0; i < result.length; i++ ) {
                jsonResult.push( {
                    id: i
                } )
            }

            return Connection.createJsonResponse( true, result.length + Constants.MESSAGE_SUCCESS, jsonResult )
        }

    } catch ( e ) {
        console.log( ' ---- E: getMapSaList ----' )
        console.error( e )
        console.log( ' ---- E: getMapSaList ----' )
    }

}