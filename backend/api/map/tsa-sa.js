/**
 * @API
 * @desc 신호이력정보 - 연동정보 - 연동그룹에서 필요한 SA 목록 불러오기(명지대에서 제공한 교차로가 전부 CI.... DB Table 따로 구성하여 만듬)
 * @module ~/backend/api/map/tsa-sa
 * @path map/tsa-sa
 * @function getMapTsaSa()
 * @param { saNo } 
 * @return { Object } jsonResult
 */

const Connection = require( '../../db/Connection' )
const Constants = require( '../../modules/Constants' )

exports.getMapTsaSa = ( saNo ) => {
    return getMapTsaSaLocal( saNo )
}

async function getMapTsaSaLocal ( saNo ) {

    let jsonResult = []

    try {

        const query =
            `
        SELECT 
            SMTS.SA_NO, 
            SMTS.SA_NAME, 
            SMTS.INT_LCNO, 
            SMTS.INT_SEQ, 
            SMI.INT_NAME 
        FROM 
            SCS_M_TIMS_SAOPERATE SMTS,
            SCS_M_INTLC SMI 
        WHERE 
            SMTS.SA_NO = ${ saNo }
        AND 
            SMTS.INT_LCNO = SMI.INT_LCNO
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
                    lcNo: result.rows[ i ].INT_LCNO,
                    seq: result.rows[ i ].INT_SEQ,
                    lcName: result.rows[i].INT_NAME,
                } )
            }

            return Connection.createJsonResponse( true, result.rows.length + Constants.MESSAGE_SUCCESS, jsonResult )
        }

    } catch ( e ) {
        console.log( ' ---- E: getMapTsaSaLocal ----' )
        console.error( e )
        console.log( ' ---- E: getMapTsaSaLocal ----' )
    }
}