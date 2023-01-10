"use strict";

/**
 * API
 *
 * 경로: 메인
 * 설명: 지도에 표출할 현시 정보 조회
 *
 */

var constants = require("../../modules/signal_server/constants");
var variables = require("../../modules/signal_server/class");
const Connection = require("../../db/Connection");

//전역함수
//GET
exports.getDisplayLcPhaseInfo = (northEastLat, northEastLng, southWestLat, southWestLng) => {
    console.log("FUNCTION - getDisplayLcPhaseInfo()");
    return getDisplayLcPhaseInfoLocal(northEastLat, northEastLng, southWestLat, southWestLng);
};

//지역함수
//GET
async function getDisplayLcPhaseInfoLocal(northEastLat, northEastLng, southWestLat, southWestLng) {
    let jsonResult = [];

    try {
        const lcInfoArr = variables.lcInfoArr;

        const query = `
            SELECT
                RTRIM(xmlagg(xmlelement(e,INT_LCNO,',').extract('//text()')).GetClobVal(),',') AS LC_LIST
            FROM (
                SELECT
                    T.INT_LCNO
                FROM
                    SCS_M_INTLC T
                INNER JOIN SCS_M_NODE N
                    ON N.NODE_ID = T.NODE_ID
                WHERE
                    NODE_LAT BETWEEN ${southWestLat} AND ${northEastLat}
                AND
                    NODE_LNG BETWEEN ${southWestLng} AND ${northEastLng}
            )
        `;
        const bindParams = [];
        const result = await Connection.a_sendQuery(query, bindParams);

        if (Connection.isEmpty(result)) {
            return Connection.createJsonResponse(false, constants.RESULT_STRING.DB1, jsonResult);
        } else {
            let resultObject = {};

            if (Connection.isEmpty(result.rows[0].LC_LIST)) {
                return Connection.createJsonResponse(true, "0" + constants.RESULT_STRING.DB2, jsonResult);
            }

            result.rows.forEach((row) => {
                resultObject = row.LC_LIST.split(",").map(Number);
            });

            resultObject.forEach((element) => {
                const lcStatusArr = variables.lcStatusArr;

                let lcStatus = null;

                // 연등이 아닐 경우
                if (lcInfoArr[element - 1].lcType !== constants.LCTYPE_VIRTUAL) {
                    lcStatus = lcStatusArr[element - 1];
                }

                //연등일경우
                else {
                    lcStatus = lcStatusArr[lcInfoArr[element - 1].mainLcNo - 1];
                }

                const resultObject2 = {
                    lcno: element,
                    prev: element.splitPrev,
                    planinfo: lcStatus.planInfo,
                    phasea: lcStatus.phaseA,
                    phaseb: lcStatus.phaseB,
                };

                jsonResult.push(resultObject2);
            });
            return Connection.createJsonResponse(true, resultObject.length + constants.RESULT_STRING.DB2, jsonResult);
        }
    } catch (error) {
        return Connection.createJsonResponse(false, error.message, jsonResult);
    }
}
