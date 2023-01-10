/**
 * @API
 * @desc 한 노드를 기준으로 다음 노드 id 가져오기
 * @module ~/backend/api/init/next-node
 * @path map/next-node
 * @function getNextNodeId()
 * @param null
 */

const Connection = require("../../db/Connection");
const Constants = require("../../modules/Constants");

exports.getNextNodeList = (nodeId) => {
    return getNextNodeListLocal(nodeId);
};

async function getNextNodeListLocal(nodeId) {
    let jsonResult = [];

    try {
        const query = `
            SELECT
                SML.LINK_ID,
                SML.NODE_FID,
                SML.NODE_TID
            FROM
                BCSCS.SCS_M_INTLC SMI,
                RESCS.SCS_M_LINK SML
            WHERE
                SMI.INT_LCNO = SML.NODE_TID (+)
            AND
                SML.NODE_FID = ${nodeId}

             `;

        const bindParams = [];
        const result = await Connection.a_sendQuery(query, bindParams);

        if (Connection.isEmpty(result)) {
            return Connection.createJsonResponse(false, Constants.MESSAGE_FAILED, jsonResult);
        } else {
            for (let i = 0; i < result.rows.length; i++) {
                jsonResult.push({
                    linkId: result.rows[i].V_LINK_ID,
                    nodeFId: result.rows[i].NODE_FID,
                    nodeTId: result.rows[i].NODE_TID,
                    num: result.rows[i].NUM,
                });
            }

            return Connection.createJsonResponse(true, result.rows.length + Constants.MESSAGE_SUCCESS, jsonResult);
        }
    } catch (e) {
        console.log(" ---- E: getNextNodeListLocal ----");
        console.error(e);
        console.log(" ---- E: getNextNodeListLocal ----");
    }
}
