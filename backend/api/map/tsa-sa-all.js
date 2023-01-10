/**
 * @API
 * @desc 신호이력정보 - 연동정보 - 연동그룹에서 필요한 SA 전체 목록 불러오기(명지대에서 제공한 교차로가 전부 CI.... DB Table 따로 구성하여 만듬)
 * @module ~/backend/api/map/tsa-sa-all
 * @path map/tsa-sa-all
 * @function getMapTsaSaAll()
 * @param {  } 
 * @return { Object } jsonResult
 */

const Connection = require( '../../db/Connection' )
const Constants = require( '../../modules/Constants' )

exports.getMapTsaSaAll = () => {
    return getMapTsaSaAllLocal()
}

async function getMapTsaSaAllLocal () {

    let jsonResult = []

    try {

        const query =
            `
        SELECT
            SA_NO,
            SA_NAME
        FROM
            SCS_M_TIMS_SAOPERATE
        GROUP BY
            SA_NO,
            SA_NAME
        ORDER BY 
            SA_NO
        `

        const bindParams = []
        const result = await Connection.a_sendQuery( query, bindParams )

        if ( Connection.isEmpty( result ) ) {

            return Connection.createJsonResponse( false, Constants.MESSAGE_FAILED, jsonResult )

        } else {

            for ( let i = 0; i < result.rows.length; i++ ) {
                jsonResult.push( {
                    saNo: result.rows[ i ].SA_NO,
                    saName: result.rows[ i ].SA_NAME,
                } )
            }

            return Connection.createJsonResponse( true, result.rows.length + Constants.MESSAGE_SUCCESS, jsonResult )
        }

    } catch ( e ) {
        console.log( ' ---- E: getMapTsaSaAllLocal ----' )
        console.error( e )
        console.log( ' ---- E: getMapTsaSaAllLocal ----' )
    }
}