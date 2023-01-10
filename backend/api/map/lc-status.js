"use strict";
/**
 * @API
 * @desc 교차로 상태 조회
 * @module ~/backend/api/map/lc-status
 * @path map/lc-status
 * @function getMapLcStatus()
 * @param
 */

var constants = require("../../modules/signal_server/constants");
var variables = require("../../modules/signal_server/class");
const Connection = require("../../db/Connection");
var moment = require("moment");

//전역함수
//GET
exports.getMapLcStatus = async (oprmode, oprstatus) => {
    console.log("FUNCTION - getLcStatus()");
    return getMapLcStatusLocal(oprmode, oprstatus);
};

//지역함수
//GET
async function getMapLcStatusLocal(oprmode, oprstatus) {
    var jsonResult = [];

    try {
        // 1. 변수 불러오기
        const lcStatusArr = variables.lcStatusArr;
        const lcInfoArr = variables.lcInfoArr;

        // 2. 결과 처리 및 리턴
        if (Connection.isEmpty(lcStatusArr)) {
            return Connection.createJsonResponse(false, constants.RESULT_STRING.RC1, jsonResult);
        }

        // 3. 교차로상태 불러오기 및 리턴
        else {
            const time = moment().format("YYYY-MM-DD, HH:mm:ss");

            // 파라미터 보고 조건문 거르기
            // a. oprmode가 ''(공백)인 경우: oprstatus를 선택한 경우
            if (oprmode === "" && oprstatus !== "1") {
                lcStatusArr.forEach((element, index) => {
                    const lcNo = index + 1;

                    const isUsed = lcInfoArr[index].isUsed;

                    // DB에 정의되어 있지 않은 애들은 패스
                    if (lcInfoArr[index].lcNo === 0) return;

                    // 연등은 제외
                    if (lcInfoArr[index].mainLcNo > 0) return;

                    // 통신이상
                    if (oprstatus === "0" && (element.oprStatus !== 0 || isUsed === false)) return;

                    // 소등
                    if (oprstatus === "6" && (element.oprStatus === 0 || element.lightOff !== 1 || isUsed === false)) return;

                    // 점멸
                    if (oprstatus === "5" && (element.oprStatus === 0 || element.flash !== 1 || isUsed === false)) return;

                    // 수동(수동진행, 수동점멸, 수동소등)
                    if ((oprstatus === "7" || oprstatus === "8" || oprstatus === "9") && ((element.oprStatus !== 7 && element.oprStatus !== 8 && element.oprStatus !== 9) || isUsed === false)) return;

                    // 모순
                    if (oprstatus === "18" && (element.oprStatus === 0 || element.conflict !== 1 || isUsed === false)) return;

                    // 함체문열림
                    if (oprstatus === "19" && (element.oprStatus === 0 || element.doorOpen !== 1 || isUsed === false)) return;

                    // 모순감지불가
                    if (oprstatus === "20" && (element.oprStatus === 0 || element.conflictEnable !== 0 || isUsed === false)) return;

                    // 현시유지
                    if (oprstatus === "10" && (element.oprStatus === 0 || element.oprStatus !== 10 || isUsed === false)) return;

                    // 전이
                    if (oprstatus === "4" && (element.oprStatus === 0 || element.oprStatus !== 4 || isUsed === false)) return;

                    // PPC모드
                    if (oprstatus === "12" && (element.oprStatus === 0 || element.oprStatus !== 12 || isUsed === false)) return;

                    // 사용안함
                    if (oprstatus === "17" && isUsed === true) return;

                    // 강제TOD
                    if (oprstatus === "14" && (element.oprStatus === 0 || element.oprStatus !== 14 || isUsed === false)) return;

                    const jProto = {
                        splitPrev: element.splitPrev,
                        sano: lcStatusArr[index].saNo, // number 그룹번호
                        // "sano": lcInfoArr[ index ].saNo, // number 그룹번호
                        lcno: lcNo, // number 교차로번호
                        lcname: lcInfoArr[index].lcName, // string 교차로이름
                        oprtime: time, // string 운영시각
                        oprmode: element.oprMode, // number 운영모드
                        oprstatus: element.oprStatus, // number 운영상태
                        commfail: element.commFail, // number SCU통신
                        powerfail: element.powerFail, // number 전원상태
                        lightoff: element.lightOff, // number 소등상태
                        flash: element.flash, // number 점멸상태
                        policeman: element.policeMan, // number 수동
                        conflict: element.conflict, // number 모순상태
                        dberror: element.dbError, // number DB상태
                        dooropen: element.doorOpen, // number 함체문열림
                        offset: element.offset, // number 옵셋
                        planinfo: element.planInfo, // number 신호맵구분(일반제/시차제)
                        ringmode: element.ringMode, // number 링운영모드
                        stepa: element.stepA, // number 링A스텝
                        stepb: element.stepB, // number 링B스텝
                        phasea: element.phaseA, // number 링A현시
                        phaseb: element.phaseB, // number 링B현시
                        omitphase: element.omitPhase, // number 생략현시
                        holdphase: element.holdPhase, // number 유지현시
                        conflictenable: element.conflictEnable, // string 모순감지 가부
                        transcount: element.transCount, // number 전이횟수
                    };
                    jsonResult.push(jProto);
                });
            }
            // b. oprstatus가 ''(공백)인 경우: oprmode를 선택한 경우
            else if (oprmode !== "" && oprstatus === "") {
                lcStatusArr.forEach((element, index) => {
                    const lcNo = index + 1;
                    const isUsed = lcInfoArr[index].isused;

                    // 연등은 제외
                    if (lcInfoArr[index].mainLcNo > 0) return;

                    // 사용안함 거르기
                    if (isUsed === false) return;

                    // 1. 전체일 때
                    if (oprmode === "-1") {
                        if (element.lcNo !== 0) {
                            // 모든 교차로 넣음
                            const jProto = {
                                splitPrev: element.splitPrev,
                                sano: element.saNo, // number 그룹번호
                                lcno: lcNo, // number 교차로번호
                                lcname: lcInfoArr[index].lcName, // string 교차로이름
                                oprtime: time, // string 운영시각
                                oprmode: element.oprMode, // number 운영모드
                                oprstatus: element.oprStatus, // number 운영상태
                                commfail: element.commFail, // number SCU통신
                                powerfail: element.powerFail, // number 전원상태
                                lightoff: element.lightOff, // number 소등상태
                                flash: element.flash, // number 점멸상태
                                policeman: element.policeMan, // number 수동
                                conflict: element.conflict, // number 모순상태
                                dberror: element.dbError, // number DB상태
                                dooropen: element.doorOpen, // number 함체문열림
                                offset: element.offset, // number 옵셋
                                planinfo: element.planInfo, // number 신호맵구분(일반제/시차제)
                                ringmode: element.ringMode, // number 링운영모드
                                stepa: element.stepA, // number 링A스텝
                                stepb: element.stepB, // number 링B스텝
                                phasea: element.phaseA, // number 링A현시
                                phaseb: element.phaseB, // number 링B현시
                                omitphase: element.omitPhase, // number 생략현시
                                holdphase: element.holdPhase, // number 유지현시
                                conflictenable: element.conflictEnable, // string 모순감지 가부
                                transcount: element.transCount, // number 전이횟수
                            };
                            jsonResult.push(jProto);
                        }
                    }

                    // 2. 전체가 아닐 때
                    else {
                        // 선택하지 않은 oprmode 제외
                        if (parseInt(oprmode) !== element.oprMode) return;

                        if (element.oprStatus === 0) return;

                        const jProto = {
                            splitPrev: element.splitPrev,
                            sano: element.saNo, // number 그룹번호
                            lcno: lcNo, // number 교차로번호
                            lcname: lcInfoArr[index].lcName, // string 교차로이름
                            oprtime: time, // string 운영시각
                            oprmode: element.oprMode, // number 운영모드
                            oprstatus: element.oprStatus, // number 운영상태
                            commfail: element.commFail, // number SCU통신
                            powerfail: element.powerFail, // number 전원상태
                            lightoff: element.lightOff, // number 소등상태
                            flash: element.flash, // number 점멸상태
                            policeman: element.policeMan, // number 수동
                            conflict: element.conflict, // number 모순상태
                            dberror: element.dbError, // number DB상태
                            dooropen: element.doorOpen, // number 함체문열림
                            offset: element.offset, // number 옵셋
                            planinfo: element.planInfo, // number 신호맵구분(일반제/시차제)
                            ringmode: element.ringMode, // number 링운영모드
                            stepa: element.stepA, // number 링A스텝
                            stepb: element.stepB, // number 링B스텝
                            phasea: element.phaseA, // number 링A현시
                            phaseb: element.phaseB, // number 링B현시
                            omitphase: element.omitPhase, // number 생략현시
                            holdphase: element.holdPhase, // number 유지현시
                            conflictenable: element.conflictEnable, // string 모순감지 가부
                            transcount: element.transCount, // number 전이횟수
                        };
                        jsonResult.push(jProto);
                    }
                });
            }
            return Connection.createJsonResponse(true, constants.RESULT_STRING.RC3, jsonResult);
        }
    } catch (err) {
        console.error("ERROR!!!: ", err.message);
        return Connection.createJsonResponse(false, err.message, jsonResult);
    }
}
