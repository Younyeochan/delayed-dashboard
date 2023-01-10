/**
 * @API
 * @desc frontend에서 현재 보이는 바운더리 값에 해당하는 link 목록만 불러오기
 * @module ~/backend/api/map/link
 * @path map/link
 * @function getMapLinkList()
 * @param  {String northEastLat, String northEastLng, String southWestLat, String southWestLng}
 */

const Connection = require("../../db/ConnectionRescs");
const Constants = require("../../modules/Constants");

exports.getMapLinkList = (north, east, south, west) => {
    return getMapLinkListLocal(north, east, south, west);
};

async function getMapLinkListLocal(north, east, south, west) {
    console.log(north, east, south, west);

    let jsonResult = [];

    try {
        const query = `
                SELECT
                RTRIM(xmlagg(xmlelement(e,LINK_ID,',').extract('//text()')).GetClobVal(),',') AS LINK_LIST
                FROM
                (SELECT
                    DISTINCT LINK_ID
                FROM
                    SCS_M_LINK
                WHERE
                    SDO_RELATE(GEOM,
                    MDSYS.SDO_GEOMETRY(
                    2003,
                    4326,
                    NULL,
                    SDO_ELEM_INFO_ARRAY(1,1003,1),
                    SDO_ORDINATE_ARRAY(
                    ${south},
                    ${west},
                    ${north},
                    ${west},
                    ${north},
                    ${east},
                    ${south},
                    ${east},
                    ${south},
                    ${west} )
                ), \'mask=ANYINTERACT\') = \'TRUE\')
            `;

        const bindParams = [];
        const result = await Connection.a_sendQuery(query, bindParams);

        if (Connection.isEmpty(result)) {
            return Connection.createJsonResponse(false, Constants.MESSAGE_FAILED, jsonResult);
        } else {
            // return 값 무조건 1개
            jsonResult = {
                linkList: result.rows[0].LINK_LIST,
            };

            return Connection.createJsonResponse(true, result.rows.length + Constants.MESSAGE_SUCCESS, jsonResult);
        }
    } catch (e) {
        console.log(" ---- E: getMapLinkListLocal ----");
        console.error(e);
        console.log(" ---- E: getMapLinkListLocal ----");
    }
}
