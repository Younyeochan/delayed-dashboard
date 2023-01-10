/**
 * @API
 * @desc frontend에서 현재 보이는 바운더리 값에 해당하는 lc 목록만 불러오기
 * @module ~/backend/api/map/lc
 * @path map/lc
 * @function getMapLcList()
 * @param  String northEastLat, String northEastLng, String southWestLat, String southWestLng
 */

const Connection = require("../../db/Connection");
const Constants = require("../../modules/Constants");

exports.getMapLcList = (northEastLng, northEastLat, southWestLng, southWestLat) => {
    return getMapLcListLocal(northEastLng, northEastLat, southWestLng, southWestLat);
};

async function getMapLcListLocal(northEastLng, northEastLat, southWestLng, southWestLat) {
    let jsonResult = [];

    try {
        const query = `
        SELECT
            INT_LCNO
        FROM
            BCSCS.SCS_M_INTLC T
        INNER JOIN
            RESCS.SCS_M_NODE N ON N.NODE_ID = T.INT_LCNO
        WHERE
            NODE_LNG
                BETWEEN
                '${southWestLng}'
                AND
                '${northEastLng}'
        AND
            NODE_LAT
                BETWEEN
                '${southWestLat}'
                AND
                '${northEastLat}'
        ORDER BY
            INT_LCNO
        `;

        const bindParams = [];
        const result = await Connection.a_sendQuery(query, bindParams);

        if (Connection.isEmpty(result)) {
            return Connection.createJsonResponse(false, Constants.MESSAGE_FAILED, jsonResult);
        } else {
            for (let i = 0; i < result.rows.length; i++) {
                jsonResult.push({
                    lcNo: result.rows[i].INT_LCNO,
                });
            }

            return Connection.createJsonResponse(true, result.rows.length + Constants.MESSAGE_SUCCESS, jsonResult);
        }
    } catch (e) {
        console.log(" ---- E: getMapLcList ----");
        console.error(e);
        console.log(" ---- E: getMapLcList ----");
    }
}
