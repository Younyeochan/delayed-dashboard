"use strict";

let oracledb = require("oracledb");
var crypto = require("crypto");
var constants = require("./constants");

/**
 * DEV ORACLE
 */
// var oracleDbData = require("../db/config/oracle");

// const ORACLE_CONNECT_INFO = {
//     user: oracleDbData.user,
//     password: oracleDbData.password,
//     connectString: oracleDbData.connectString,
//     libDir: oracleDbData.libDir,
// };

// Object.freeze(ORACLE_CONNECT_INFO);

/* INIT */

// 그룹 정보 불러오기
const getSaInfo = async function getSaInfo(saInfoArr) {
    // 1. 쿼리 불러오기
    const query =
        " SELECT " +
        "   SA_NO, " +
        "   SA_NAME, " +
        "   SA_DEFAULTCNTLMODE, " +
        "   SA_MINOPERATECYCLE, " +
        "   SA_PHASEFACTOR, " +
        "   SA_OFFSETADJSTFACTOR, " +
        "   SA_TRCCNTL1, " +
        "   SA_TRCCNTL2, " +
        "   SA_AUTOONLINEREQ, " +
        "   SA_MINCYCLELEVEL, " +
        "   SA_MAXCYCLELEVEL, " +
        "   SA_CYCLEMTD, " +
        "   SA_CYCLERNG, " +
        "   SA_CYCLETRANSMTD, " +
        "   SA_CYCLETIMESETMTD, " +
        "   SA_REGFLAG, " +
        "   SA_SAJOINMTD, " +
        "   SA_SAJOINVARIABLE1, " +
        "   SA_SAJOINVARIABLE2, " +
        "   SA_SAJOINVARIABLE3, " +
        "   SA_SAJOINVARIABLE4, " +
        "   SA_SAJOINVARIABLE5, " +
        "   SA_SAJOINVARIABLE6  " +
        " FROM SCS_M_SAOPERATE   " +
        " ORDER BY SA_NO ";

    // 2. 파라미터 넣기
    const bindParams = [];

    // 3. 쿼리 실행
    const result = await sendQuery(query, bindParams);

    // 4. 결과 처리 및 리턴
    if (isEmpty(result)) {
        return "Failed: getSaInfo";
    } else {
        // 정보를 받아오기 전에 배열을 모두 초기화
        saInfoArr.forEach((element) => {
            element.setAllZero();
        });

        result.rows.forEach((row) => {
            if (row.SA_NO > 0) {
                let i = row.SA_NO - 1;

                saInfoArr[i].saNo = row.SA_NO; // 그룹번호
                saInfoArr[i].isUsed = Boolean(row.SA_REGFLAG); // 그룹사용여부
                saInfoArr[i].saName = row.SA_NAME; // 그룹이름
                saInfoArr[i].saCtrlMode = row.SA_DEFAULTCNTLMODE; // 그룹제어모드(0: TOD, 1: TRC)
                saInfoArr[i].minOperateCycle = row.SA_MINOPERATECYCLE; // 최소주기유지수
                saInfoArr[i].phaseFactor = row.SA_PHASEFACTOR; // 현시조정상수
                saInfoArr[i].offsetAdjstFactor = row.SA_OFFSETADJSTFACTOR; // 옵셋조정상수
                saInfoArr[i].trcCntl1 = row.SA_TRCCNTL1; // TOD-주기(TRC)(0: 미체크, 1: 체크)
                saInfoArr[i].trcCntl2 = row.SA_TRCCNTL2; // TOD-옵셋(TRC)(0: 미체크, 1: 체크)
                saInfoArr[i].autoOnlineReq = row.SA_AUTOONLINEREQ; // 자동센터모드(0: 미체크, 1: 체크)
                saInfoArr[i].minCycleLevel = row.SA_MINCYCLELEVEL; // 최소주기레벨
                saInfoArr[i].maxCycleLevel = row.SA_MAXCYCLELEVEL; // 최대주기레벨
                saInfoArr[i].cycleMtd = row.SA_CYCLEMTD; // 주기전환방법(0: DEFAULT사용, 1: 주기전환범위)
                saInfoArr[i].cycleRng = row.SA_CYCLERNG; // 주기전환범위
                saInfoArr[i].cycleTransMtd = row.SA_CYCLETRANSMTD; // 전이방법(0: 단계, 1: 즉시)
                saInfoArr[i].cycleTimeSetMtd = row.SA_CYCLETIMESETMTD; // 기준시각(0: 시스템, 1: 그룹)
                // saInfoArr[i].regFlag = row.SA_REGFLAG; // 그룹사용여부(0: 미사용, 1: 사용)
                saInfoArr[i].saJoinMtd = row.SA_SAJOINMTD; // 그룹결합방법
                saInfoArr[i].saJoinVariable1 = row.SA_SAJOINVARIABLE1; // 축결정변수1
                saInfoArr[i].saJoinVariable2 = row.SA_SAJOINVARIABLE2; // 축결정변수2
                saInfoArr[i].saJoinVariable3 = row.SA_SAJOINVARIABLE3; // 축결정변수3
                saInfoArr[i].saJoinVariable4 = row.SA_SAJOINVARIABLE4; // 축결정변수4
                saInfoArr[i].saJoinVariable5 = row.SA_SAJOINVARIABLE5; // 축결정변수5
                saInfoArr[i].saJoinVariable6 = row.SA_SAJOINVARIABLE6; // 축결정변수6
            }
        });
        return "Success: getSaInfo";
    }
};

// 교차로 정보 불러오기
const getLcInfo = async function getLcInfo(lcInfoArr) {
    // 1. 쿼리 불러오기
    const query =
        " SELECT " +
        "   T.INT_LCNO, " +
        "   T.NODE_ID, " +
        "   T.INT_NAME, " +
        "   T.INT_IMPORFLAG, " +
        "   T.INT_LCTYPE, " +
        "   T.INT_LAMPTYPE, " +
        "   T.MCU_FW_ID, " +
        "   T.SCU_FW_ID, " +
        "   T.INT_DELTALIMIT, " +
        "   T.INT_TRANSCYCLE, " +
        "   T.INT_AUTOERROR, " +
        "   T.INT_AUTOONLINE, " +
        "   T.INT_COMMTYPE, " +
        "   T.INT_IP, " +
        "   T.INT_PORT, " +
        "   T.MAIN_LCNO, " +
        "   T.INT_FEPNO, " +
        // "   T.ALG_LCNO, " +
        "   T.INT_SANO, " +
        "   T.INT_SAINDEX, " +
        "   T.INT_REGFLAG " +
        " FROM SCS_M_INTLC T " +
        " ORDER BY T.INT_LCNO ";

    // 2. 파라미터 넣기
    const bindParams = [];

    // 3. 쿼리 실행
    const result = await sendQuery(query, bindParams);

    // 4. 결과 처리 및 리턴
    if (isEmpty(result)) {
        return "Failed: getLcInfo";
    } else {
        // 정보를 받아오기 전에 배열을 모두 초기화
        lcInfoArr.forEach((element) => {
            element.setAllZero();
        });

        result.rows.forEach((row) => {
            if (row.INT_LCNO > 0) {
                let i = row.INT_LCNO - 1;
                lcInfoArr[i].lcNo = row.INT_LCNO;
                lcInfoArr[i].isUsed = Boolean(row.INT_REGFLAG);
                lcInfoArr[i].nodeId = row.NODE_ID;
                lcInfoArr[i].lcName = row.INT_NAME;
                lcInfoArr[i].lcType = setDef(row.MAIN_LCNO, 0) > 0 ? constants.LCTYPE_VIRTUAL : row.INT_IMPORFLAG;
                lcInfoArr[i].tcdvType = row.INT_LCTYPE;
                lcInfoArr[i].lampType = row.INT_LAMPTYPE;
                lcInfoArr[i].mcuFwId = setDef(row.MCU_FW_ID, "");
                lcInfoArr[i].scuFwId = setDef(row.SCU_FW_ID, "");
                lcInfoArr[i].deltaLimit = row.INT_DELTALIMIT;
                lcInfoArr[i].transCycle = row.INT_TRANSCYCLE;
                lcInfoArr[i].autoError = row.INT_AUTOERROR;
                lcInfoArr[i].autoOnline = row.INT_AUTOONLINE;
                lcInfoArr[i].commType = row.INT_COMMTYPE;
                lcInfoArr[i].ip = setDef(row.INT_IP, "");
                lcInfoArr[i].port = row.INT_PORT;
                lcInfoArr[i].fepNo = row.INT_FEPNO;
                lcInfoArr[i].mainLcNo = setDef(row.MAIN_LCNO, 0);
                lcInfoArr[i].algLcNo = setDef(row.ALG_LCNO, 0);
                lcInfoArr[i].saNo = row.INT_SANO;
                lcInfoArr[i].saIndex = row.INT_SAINDEX;
            }
        });
        return "Success: getLcInfo";
    }
};

// 교차로 현황 불러오기
const getLcCount = function getLcCount(lcCount, lcStatusArr, lcInfoArr) {
    lcCount.setAllZero();

    lcStatusArr.forEach((element, index) => {
        let isVirtual = false;

        // 1. 연등인지 체크
        if (lcInfoArr[index].mainLcNo > 0) {
            isVirtual = true;
        }

        // 2. DB정보에 없는 교차로 거르기
        if (lcInfoArr[index].lcNo === 0) {
            return;
        }

        // 3. 운영교차로/사용안함 개수 체크
        // 전체 교차로 개수
        lcCount.total++;

        // 운영교차로
        if (lcInfoArr[index].isUsed === true) {
            lcCount.used++;
        }
        // 사용안함
        else if (isVirtual === false) {
            lcCount.unused++;
            return;
        }

        // 4. 운영상태&운영모드 개수 체크
        if (isVirtual === false) {
            // 운영상태
            if (element.oprStatus === constants.LC_OPRSTATUS_COMM_FAIL) {
                lcCount.commFail++;
            } // 통신이상
            // else if (element.oprStatus === constants.LC_OPRSTATUS_CENTER_MODE ) { } // 센터-무감응 → oprmode
            // else if (element.oprStatus === constants.LC_OPRSTATUS_LOCAL_MODE ) { } // 로컬-무감응 → oprmode
            // else if (element.oprStatus === constants.LC_OPRSTATUS_FAIL) { } // 실패
            else if (element.oprStatus === constants.LC_OPRSTATUS_TRANSE) {
                lcCount.transition++;
            } // 전이
            // else if (element.oprStatus === constants.LC_OPRSTATUS_FLASH) { } // 점멸 → lcStatus
            // else if (element.oprStatus === constants.LC_OPRSTATUS_LIGHT_OFF) { } // 소등 → lcStatus
            else if (element.oprStatus === constants.LC_OPRSTATUS_MAN_OPR) {
                lcCount.manual++;
            } // 수동진행
            else if (element.oprStatus === constants.LC_OPRSTATUS_MAN_FLASH) {
                lcCount.manual++;
            } // 수동점멸
            else if (element.oprStatus === constants.LC_OPRSTATUS_MAN_LIGHT_OFF) {
                lcCount.manual++;
            } // 수동소등
            else if (element.oprStatus === constants.LC_OPRSTATUS_PAHSE_HOLD) {
                lcCount.phaseHold++;
            } // 현시유지
            // else if (element.oprStatus === constants.LC_OPRSTATUS_SCU_MODE ) { } // SCU모드
            else if (element.oprStatus === constants.LC_OPRSTATUS_PPC_MODE) {
                lcCount.ppcMode++;
            } // PPC모드
            // else if (element.oprStatus === constants.LC_OPRSTATUS_ACT_MODE) { } // 감응제어(해당없음) → 사용안함
            else if (element.oprStatus === constants.LC_OPRSTATUS_FORCE_TOD) {
                lcCount.forceTod++;
            } // 강제TOD
            // else if (element.oprStatus === constants.LC_OPRSTATUS_CENTER_ACT_MODE ) { } // 센터-감응 → oprmode
            // else if (element.oprStatus === constants.LC_OPRSTATUS_LOCAL_ACT_MODE ) { } // 로컬-감응 → oprmode

            // 운영모드(운영상태가 통신이상이 아닌 것)
            if (element.oprStatus !== constants.LC_OPRSTATUS_COMM_FAIL) {
                if (element.oprMode === constants.LC_OPRMODE_SCU_FIXCYCLE) {
                    lcCount.scuFixCycle++;
                } // SCU고정주기
                else if (element.oprMode === constants.LC_OPRMODE_LOCAL_NOACT) {
                    lcCount.localNoAct++;
                } // 로컬-무감응
                else if (element.oprMode === constants.LC_OPRMODE_LOCA_ACT) {
                    lcCount.localAct++;
                } // 로컬-감응
                else if (element.oprMode === constants.LC_OPRMODE_HALF_ACT) {
                    lcCount.halfAct++;
                } // 반감응
                else if (element.oprMode === constants.LC_OPRMODE_CENTER_ACT) {
                    lcCount.centerAct++;
                } // 센터-감응
                else if (element.oprMode === constants.LC_OPRMODE_CENTER_NOACT) {
                    lcCount.centerNoAct++;
                } // 센터-무감응
                // else if (element.oprMode === constants.LC_OPRMODE_COMM_FAIL) { } // 통신이상 → oprStatus의 통신이상

                if (element.lightOff === constants.LIGHT_OFF_1) {
                    lcCount.lightOff++;
                } // 소등
                if (element.flash === constants.FLASH_1) {
                    lcCount.flash++;
                } // 점멸
                // if (element.policeIng === constants.POLICE_ING_1) { } // 수동 → oprStatus의 수동진행, 수동점멸, 수동소등 3개의 합
                if (element.conflict === constants.CONFLICT_1) {
                    lcCount.conflict++;
                } // 모순
                if (element.doorOpen === constants.DOOR_OPEN_1) {
                    lcCount.doorOpen++;
                } // 함체문 열림
                if (element.conflictEnable === constants.CONFLICT_ENABLE_0) {
                    lcCount.conflictEnable++;
                } // 모순감지불가
            }
        }
    });
};

/**
 * functions()
 */

// write event history
const writeEventControl = async function writeEventControl(userId, eventType, eventValue, ctlKind, ctlAll, ctlTargetNo, RtnStr) {
    try {
        let successCount = 0;
        const query =
            " INSERT INTO SCS_L_USERCONTROL " +
            " ( " +
            "   CTL_CREDATE, " +
            "   CTL_CODE, " +
            "   CTL_KIND, " +
            "   CTL_ALL, " +
            "   CTL_NO, " +
            "   USER_ID, " +
            "   CTL_VALUE, " +
            "   CTL_DESC " +
            " ) " +
            " VALUES " +
            " ( " +
            "   SYSTIMESTAMP, " +
            "   :CTL_CODE, " +
            "   :CTL_KIND, " +
            "   :CTL_ALL, " +
            "   :CTL_NO, " +
            "   :USER_ID, " +
            "   :CTL_VALUE, " +
            "   :CTL_DESC " +
            " ) ";

        const bindParams = [eventType, ctlKind, ctlAll, ctlTargetNo, userId, eventValue, RtnStr];
        const result = await sendQuery(query, bindParams, {autoCommit: true});

        if (isEmpty(result)) {
            return "Failed: writeEventControl";
        }

        if (result.rowsAffected === 0) {
        } else {
            successCount++;
        }

        return "Sucess: writeEventCOntrol(Success Count: " + successCount + ")";
    } catch (error) {
        console.error("ERROR:: writeEventControl() -");
        return "ERROR: writeEventControl() - " + error.message;
    }
};

// encrypt password
const key = "EasyTrafficTech!";
const iv = "EasyTrafficTech!";
const algorithm = "aes-128-cbc";

const encrypt_aes128 = (text) => {
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encipheredContent = cipher.update(text, "utf8", "hex");
    encipheredContent += cipher.final("hex");
    return encipheredContent;
};

const decrypt_aes128 = (text) => {
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decipheredPlaintext = decipher.update(text, "hex", "utf8");
    decipheredPlaintext += decipher.final("utf8");
    return decipheredPlaintext;
};

// set the value to default if it is null
const setDef = function (value, defaultValue) {
    return value === null || value === undefined ? defaultValue : value;
};

//set the value to default if it is null
const isEmpty = function (value) {
    return value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length) ? true : false;
};

//create then JSON object for front-end
const createResponse = function (result, msg, data) {
    let jsonResult = {
        result: result,
        msg: msg,
        data: data,
    };
    return jsonResult;
};

//send queries to db
const sendQuery = async function (
    query,
    bindParams,
    options = {
        autoCommit: true,
        fetchArraySize: 100,
        timeout: 10,
    }
) {
    try {
        if (isEmpty(query)) {
            console.log("SENDQUERY(): VALIDATION CHECK - QUERY IS INVALID");
            return;
        }

        return new Promise(async function (resolve, reject) {
            let result = null,
                conn = null;

            try {
                conn = await oracledb.getConnection({
                    user: "BCSCS",
                    password: "BCSCS",
                    connectString: "192.168.219.71:1521/orcl",
                    timeout: 10,
                });

                result = await conn.execute(query, bindParams, options);

                resolve(result);
            } catch (error) {
                console.error("SENDQUERY(): PROMISE CALLBACK ERROR - ", error);
                reject(error);
            } finally {
                if (conn) {
                    try {
                        await conn.close();
                        console.log("DB IS CLOSED");
                    } catch (error) {
                        console.error("SENDQUERY() : PROMISE FINALLY ERROR - ", error);
                    }
                }
            }
        });
    } catch (error) {
        console.error("ERROR : sendQuery() - ", error);
    }
};

//send queries to db (for batch, bulk )
const sendQueryBatch = async function (
    query,
    bindParams,
    options = {
        autoCommit: true,
        fetchArraySize: 100,
    }
) {
    try {
        if (isEmpty(query)) {
            console.log("SENDQUERYBATCH(): VALIDATION CHECK - QUERY IS INVALID");
            return;
        }

        return new Promise(async function (resolve, reject) {
            let result = null,
                conn = null;

            try {
                //마리아 디비 접속정보로 마리아 디비 접속
                // conn = await pool.getConnection()
                conn = await oracledb.getConnection({
                    user: "BCSCS",
                    password: "BCSCS",
                    connectString: "192.168.20.103:1521/BCSGN",
                });

                //어느 디비를 사용할건지 디비 명 기입
                // conn.query( 'USE ayscsdb' )
                // conn.query("USE ayscsdb");
                // 실제 쿼리 넘기기(오라클과 파람값 동일함. query(쿼리, [파라미터]))
                // batch bulk insert
                // conn.beginTransaction()
                try {
                    // result = await conn.execute( query, bindParams, options )
                    result = await conn.executeMany(query, bindParams, options);
                    // conn.commit()
                } catch (exception) {
                    console.log(bindParams[0]);
                    console.log(exception);
                    // conn.rollback();
                }
                resolve(result);
            } catch (error) {
                // conn.rollback();
                console.error("SENDQUERY(): PROMISE CALLBACK ERROR - ", error);
                reject(error);
            } finally {
                if (conn) {
                    try {
                        // await conn.end()
                        await conn.close();
                        console.log("DB IS CLOSED");
                    } catch (error) {
                        console.error("SENDQUERY() : PROMISE FINALLY ERROR - ", error);
                    }
                }
            }
        });
    } catch (error) {
        console.error("ERROR : sendQuery() - ", error);
    }
};

exports.writeEventControl = writeEventControl;
exports.encrypt_aes128 = encrypt_aes128;
exports.decrypt_aes128 = decrypt_aes128;
exports.sendQuery = sendQuery;
exports.sendQueryBatch = sendQueryBatch;
exports.isEmpty = isEmpty;
exports.setDef = setDef;
exports.createResponse = createResponse;
exports.getLcCount = getLcCount;
exports.getSaInfo = getSaInfo;
exports.getLcInfo = getLcInfo;
