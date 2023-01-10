/**
 * @API
 * @desc frontend에서 현재 보이는 바운더리 값에 해당하는 node 목록만 불러오기
 * @module ~/backend/api/map/node
 * @path map/node
 * @function getMapNodeList()
 * @param  String northEastLat, String northEastLng, String southWestLat, String southWestLng
 */

const Connection = require("../../db/ConnectionRescs");
const Constants = require("../../modules/Constants");

exports.getMapNodeList = (northEastLng, northEastLat, southWestLng, southWestLat) => {
    return getMapNodeListLocal(northEastLng, northEastLat, southWestLng, southWestLat);
};

async function getMapNodeListLocal(northEastLng, northEastLat, southWestLng, southWestLat) {
    let jsonResult = [];

    try {
        // RTRIM(xmlagg(xmlelement(e,NODE_ID,',').extract('//text()')).GetClobVal(),',') AS NODE_LIST
        const query = `
        SELECT
            NODE_ID
        FROM (
            SELECT
                NODE_ID
            FROM
                SCS_M_NODE
            WHERE
                NODE_LAT
                    BETWEEN '${northEastLng}' AND '${northEastLat}'
                    AND
                NODE_LNG
                    BETWEEN '${southWestLng}' AND '${southWestLat}')
         `;

        const bindParams = [];
        const result = await Connection.a_sendQuery(query, bindParams);

        if (Connection.isEmpty(result)) {
            return Connection.createJsonResponse(false, Constants.MESSAGE_FAILED, jsonResult);
        } else {
            for (let i = 0; i < result.rows.length; i++) {
                jsonResult.push({
                    nodeId: result.rows[i].NODE_LIST,
                });
            }

            return Connection.createJsonResponse(true, result.rows.length + Constants.MESSAGE_SUCCESS, jsonResult);
        }
    } catch (e) {
        console.log(" ---- E: getMapNodeListLocal ----");
        console.error(e);
        console.log(" ---- E: getMapNodeListLocal ----");
    }
}
