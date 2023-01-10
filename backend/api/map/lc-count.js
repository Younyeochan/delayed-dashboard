"use strict";
/**
 * @API
 * @desc 교차로 현황 조회
 * @module ~/backend/api/map/lc-count
 * @path map/lc-status
 * @function getMapLcCount()
 * @param
 */

var functions = require("../../modules/signal_server/functions");
var constants = require("../../modules/signal_server/constants");
var variables = require("../../modules/signal_server/class");
const Connection = require("../../db/Connection");

//전역함수
//GET
exports.getLcCount = async () => {
    console.log("FUNCTION - getLcCount()");
    return getLcCountLocal();
};

//지역함수
//GET
async function getLcCountLocal() {
    let jsonResult = {};

    try {
        const lcStatusArr = variables.lcStatusArr;
        const lcInfoArr = variables.lcInfoArr;
        const lcCount = variables.lcCount;

        functions.getLcCount(lcCount, lcStatusArr, lcInfoArr);

        if (Connection.isEmpty(lcCount)) {
            return Connection.createJsonResponse(false, constants.RESULT_STRING.RC1, jsonResult);
        } else {
            jsonResult = {
                used: lcCount.used, // 운영교차로 수
                scuFixCycle: lcCount.scuFixCycle, // SCU고정주기 수
                localNoAct: lcCount.localNoAct, // 로컬-무감응 수
                localAct: lcCount.localAct, // 로컬-감응 수
                halfAct: lcCount.halfAct, // 반감응 수
                centerNoAct: lcCount.centerNoAct, // 센터-무감응 수
                centerAct: lcCount.centerAct, // 센터-감응 수
                phaseHold: lcCount.phaseHold, // 현시유지 수
                transition: lcCount.transition, // 전이 수
                unused: lcCount.unused, // 사용안함 수
                commFail: lcCount.commFail, // 통신이상 수
                lightOff: lcCount.lightOff, // 소등 수
                flash: lcCount.flash, // 점멸 수
                manual: lcCount.manual, // 수동 수
                conflict: lcCount.conflict, // 모순 수
                doorOpen: lcCount.doorOpen, // 함체문 열림 수
                conflictEnable: lcCount.conflictEnable, // 모순감지불가 수
                ppcMode: lcCount.ppcMode, // PPC모드 수
                forceTod: lcCount.forceTod, // 강제TOD모드 수
                total: lcCount.total,
            };

            return Connection.createJsonResponse(true, constants.RESULT_STRING.RC2, jsonResult);
        }
    } catch (error) {
        return Connection.createJsonResponse(false, error.message, jsonResult);
    }
}
