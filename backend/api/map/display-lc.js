"use strict";

/**
 * API
 *
 * 경로: 메인
 * 설명: 지도에 표출할 교차로 정보 조회
 *
 */

var constants = require("../../modules/signal_server/constants");
var variables = require("../../modules/signal_server/class");
const Connection = require("../../db/Connection");

//전역함수
//GET
exports.getLcDisplayInfo = (northEastLat, northEastLng, southWestLat, southWestLng) => {
    console.log("FUNCTION - getLcDisplayInfo()");
    return getLcDisplayInfoLocal(northEastLat, northEastLng, southWestLat, southWestLng);
};

//지역함수
//GET
//교차로
async function getLcDisplayInfoLocal(northEastLat, northEastLng, southWestLat, southWestLng) {
    let jsonResult = {
        lclist: [],
    };
    let resultObject = {};

    try {
        const lcInfoArr = variables.lcInfoArr;
        const lcStatusArr = variables.lcStatusArr;

        const query = `
            SELECT
                RTRIM(xmlagg(xmlelement(e,INT_LCNO,',').extract('//text()')).GetClobVal(),',') AS LC_LIST
            FROM (
                SELECT
                    T.INT_LCNO
                FROM SCS_M_INTLC T
                INNER JOIN SCS_M_NODE N ON N.NODE_ID = T.NODE_ID
                WHERE NODE_LAT BETWEEN ${southWestLat} AND ${northEastLat}
                AND NODE_LNG BETWEEN ${southWestLng} AND ${northEastLng}
            )

        `;
        const bindParams = [];
        const result = await Connection.a_sendQuery(query, bindParams);

        if (Connection.isEmpty(result)) {
            return Connection.createJsonResponse(false, constants.RESULT_STRING.DB1, jsonResult);
        } else {
            if (Connection.isEmpty(result.rows[0].LC_LIST)) {
                return Connection.createJsonResponse(true, "0" + constants.RESULT_STRING.DB2, jsonResult);
            }

            result.rows.forEach((row) => {
                resultObject = row.LC_LIST.split(",").map(Number);
            });

            let resultArray = [];
            let status = null;

            resultObject.forEach((element, index) => {
                try {
                    //'사용'인 교차로
                    if (lcInfoArr[element - 1].isUsed === true) {
                        status = lcStatusArr[element - 1].oprStatus;
                    }

                    //'사용안함'인 교차로
                    else {
                        //연등
                        if (lcInfoArr[element - 1].lcType === constants.LCTYPE_VIRTUAL) {
                            status = lcStatusArr[lcInfoArr[element - 1].mainLcNo - 1].oprStatus;
                        }
                        //미연등
                        else {
                            status = constants.LC_OPRSTATUS_NOT_USED;
                        }
                    }

                    resultArray.push({
                        lcno: element,
                        status: status,
                    });
                } catch (error) {
                    console.error("ERROR: getLcDisplayInfoLocal()", error);
                }
            });

            let jsonResult = {
                lclist: resultArray,
            };

            return Connection.createJsonResponse(true, resultObject.length + constants.RESULT_STRING.DB2, jsonResult);
        }
    } catch (error) {
        return Connection.createJsonResponse(false);
    }
}

function getOprStatus(lcno) {
    let oprStatus = null;

    do {
        oprStatus = Math.floor(Math.random() * (17 - 1)) + 1;
    } while (oprStatus === 13);

    return oprStatus;
}
