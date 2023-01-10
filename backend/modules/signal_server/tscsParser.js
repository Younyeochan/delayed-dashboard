'use strict'

var moment = require( 'moment' )

var tscsVar = require( './class' )
var tscsConst = require( './constants' )
var json = require( './tscs.json' )

exports.tscsParser = function ( rxData )
{
    var hdSize = json.tscs_header_size
    var ssSize = json.tscs_sa_info_size
    var lsSize = json.tscs_lc_info_size
    var saMax = json.tscs_sa_max
    var lcMax = json.tscs_lc_max
    var bigEda = json.tscs_is_big_endian
    // var hdSize = tscsCfg.get('tscs_header_size');
    // var ssSize = tscsCfg.get('tscs_sa_info_size');
    // var lsSize = tscsCfg.get('tscs_lc_info_size');
    // var saMax  = tscsCfg.get('tscs_sa_max');
    // var lcMax  = tscsCfg.get('tscs_lc_max');
    // var bigEda = tscsCfg.get('tscs_is_big_endian');

    // console.log( hdSize )
    // 
    //console.log(Date() + ' Received Size: ' + rxData.byteLength);
    /*
    console.log('STX 1st: ' + rxData[0]);
    console.log('STX 2nd: ' + rxData[1]);
    */

    if ( rxData[ 9 ] != tscsConst.SCS_OP_SCS_MON_RES )
        return

    /*
    0       uint8_t             defined ;       // 사용유무
    1       uint8_t             status ;        // 그룹운영모드(0:로컬, 1:센터)
    2       uint8_t             mode ;          // 그룹운영상태(0:TOD, 1:TRC, 2:MAN)
    3       uint8_t             cycle ;         // 주기길이
    4       uint8_t             offset ;        // 옵셋패턴(1-16)
    5       uint8_t             split ;         // 현시패턴(1-16)
    
    6       uint8_t             lcCount ;       // 소속교차로 수
    7       uint8_t             centerCount ;   // 센터모드 개수
    8       uint8_t             transCount ;    // 전이모드 개수
    9       uint8_t             localCount ;    // 로컬모드 개수
    10      uint8_t             noRespCount ;   // 응답없는상태 개수
    11      uint8_t             malFuncCount ;  // 고장상태 개수
                                                // (mcu2scu,
                                                // stateDatabase,stateConflict,
                                                // powerFail이 1인 경우)
    12      uint8_t             commFailCount ; // 통신이상 개수
    13      uint8_t             flashCount ;    // 점멸운영 개수
    14      uint8_t             manualCount ;   // 수동운영 개수
    15      uint8_t             trcPlanReady ;
    16      uint8_t             todPlanReady ;
    17      uint8_t             manPlanReady ;
    18      uint8_t             trcAvailable ;
    19      uint8_t             readyToControl ;
    20      uint8_t             modeChange ;
    21      uint8_t             trcErrorCount ;
    22      uint8_t             reqCycleLevel ;
    23      uint8_t             reqDirection ;
    24      uint8_t             ciDataReady ;
    25      uint8_t             spHoldCount ;
    26      uint8_t             offsetReqCount ;
    27      uint8_t             cycleReqCount ;
    28      uint8_t             merged ;
    29      uint8_t             mgGroup ;
    30      uint8_t             ioRatio ;
    31      uint8_t             oiRatio ;
            struct {
    32          uint8_t         cycleCount ;
    33          uint8_t         cycleLength ;
    34          uint8_t         offset ;
    35          uint8_t         split ;
    36          uint8_t         timePlan ;
            } now ;
            struct {
    37          uint8_t         dayPlan ;
    38          uint8_t         timePlan ;
    39          uint8_t         cycle ;
    40          uint8_t         split ;
    41          uint8_t         offset ;
    42          uint8_t         level ;
            } tod ;
            struct {
    43          uint8_t         dayPlan ;
    44          uint8_t         timePlan ;
    45          uint8_t         cycle ;
    46          uint8_t         split ;
    47          uint8_t         offset ;
    48          uint8_t         level ;
            } trc ;
    49    uint8_t             byte50Reserved ;
            struct {
    50          uint8_t         cycle ;
    51          uint8_t         offset ;
    52          uint8_t         split ;
            } trcInfo ;
            struct {
    53          uint8_t         cycle ;
    54          uint8_t         split ;
    55          uint8_t         offset ;
    56          uint8_t         level ;
            } man ;
        typedef struct _st_ig_mg_info {
    57      uint8_t     merged ;
    58      uint8_t     mgCount ;
    59      uint8_t     dvCount ;
    60      uint8_t     reqCycle ;
        } IG_MG_INFO , * PIG_MG_INFO ;
    61, 62, 63, 64
    65, 66, 67, 68
    69, 70, 71, 72
          IG_MG_INFO          mergeInfo[MAX_MERGE_COUNT] ;    // 4
    
    73      uint8_t             byte74Reserved ;
    74      uint8_t             byte75Reserved ;
    75      uint8_t             byte76Reserved ;
    */
    // LeeGeon
    // 그룹상태(이전) 복사
    tscsVar.saStatusArrPrev = deepCopy( tscsVar.saStatusArr )

    for ( let i = 0; i < saMax; i++ ) {
        let base = hdSize + ssSize * i

        if ( rxData[ base ] ) {
            const siArr = tscsVar.saInfoArr[ i ]
            var ssArr = tscsVar.saStatusArr[ i ]
            //if (siArr.isUsed) {}
            siArr.isDefined = rxData[ base ] ? true : false
            ssArr.saStatus = rxData[ base + 1 ]
            ssArr.saCtrlMode = rxData[ base + 2 ]
            ssArr.cycle = rxData[ base + 3 ]
            ssArr.offset = rxData[ base + 4 ]
            ssArr.split = rxData[ base + 5 ]
            ssArr.lcCount = rxData[ base + 6 ]
            ssArr.centerCount = rxData[ base + 7 ]
            ssArr.transCount = rxData[ base + 8 ]
            ssArr.localCount = rxData[ base + 9 ]
            ssArr.noRespCount = rxData[ base + 10 ]
            ssArr.malFuncCount = rxData[ base + 11 ]
            ssArr.commFailCount = rxData[ base + 12 ]
            ssArr.flashCount = rxData[ base + 13 ]
            ssArr.manCount = rxData[ base + 14 ]
            ssArr.trcPlanReady = rxData[ base + 15 ]
            ssArr.todPlanReady = rxData[ base + 16 ]
            ssArr.manPlanReady = rxData[ base + 17 ]
            ssArr.trcAvailable = rxData[ base + 18 ]
            ssArr.readyToControl = rxData[ base + 19 ]
            ssArr.modeChange = rxData[ base + 20 ]
            ssArr.trcErrorCount = rxData[ base + 21 ]
            ssArr.reqCycleLevel = rxData[ base + 22 ]
            ssArr.reqDirection = rxData[ base + 23 ]
            ssArr.ciDataReady = rxData[ base + 24 ]
            ssArr.spHoldCount = rxData[ base + 25 ]
            ssArr.offsetReqCount = rxData[ base + 26 ]
            ssArr.cycleReqCount = rxData[ base + 27 ]
            //ssArr.merged  = rxData[base + 28];
            //ssArr.mgGroup = rxData[base + 29];
            ssArr.iorate = rxData[ base + 30 ]
            ssArr.oiRatio = rxData[ base + 31 ]
            // NOW
            ssArr.curCycleCount = rxData[ base + 32 ]
            ssArr.curCycleLength = rxData[ base + 33 ]
            ssArr.curOffset = rxData[ base + 34 ]
            ssArr.curSplit = rxData[ base + 35 ]
            ssArr.curTimePlan = rxData[ base + 36 ]
            // TOD
            ssArr.todDayPlan = rxData[ base + 37 ]
            ssArr.todTimePlan = rxData[ base + 38 ]
            ssArr.todCycle = rxData[ base + 39 ]
            ssArr.todSplit = rxData[ base + 40 ]
            ssArr.todOffset = rxData[ base + 41 ]
            ssArr.todLevel = rxData[ base + 42 ]
            // TRC
            ssArr.trcDayPlan = rxData[ base + 43 ]
            ssArr.trcTimePlan = rxData[ base + 44 ]
            ssArr.trcCycle = rxData[ base + 45 ]
            ssArr.trcSplit = rxData[ base + 46 ]
            ssArr.trcOffset = rxData[ base + 47 ]
            ssArr.trcLevel = rxData[ base + 48 ]
            //ssArr.byte50Reserved = rxData[base + 49];
            // TRC INFO
            ssArr.trcInfoCycleLength = rxData[ base + 50 ]
            ssArr.trcInfoOffset = rxData[ base + 51 ]
            ssArr.trcInfoSplit = rxData[ base + 52 ]
            // MAN
            ssArr.manCycleLength = rxData[ base + 53 ]
            ssArr.manSplit = rxData[ base + 54 ]
            ssArr.manOffset = rxData[ base + 55 ]
            ssArr.manLevel = rxData[ base + 56 ]
            // MERGE 1
            ssArr.merged1 = rxData[ base + 57 ]
            ssArr.mgCount1 = rxData[ base + 58 ]
            ssArr.dvCount1 = rxData[ base + 59 ]
            ssArr.reqCycle1 = rxData[ base + 60 ]
            // MERGE 2
            ssArr.merged2 = rxData[ base + 61 ]
            ssArr.mgCount2 = rxData[ base + 62 ]
            ssArr.dvCount2 = rxData[ base + 63 ]
            ssArr.reqCycle2 = rxData[ base + 64 ]
            // MERGE 3
            ssArr.merged3 = rxData[ base + 65 ]
            ssArr.mgCount3 = rxData[ base + 66 ]
            ssArr.dvCount3 = rxData[ base + 67 ]
            ssArr.reqCycle3 = rxData[ base + 68 ]
            // MERGE 4
            ssArr.merged4 = rxData[ base + 69 ]
            ssArr.mgCount4 = rxData[ base + 70 ]
            ssArr.dvCount4 = rxData[ base + 71 ]
            ssArr.reqCycle4 = rxData[ base + 72 ]
            // RESERVED
            //ssArr.byte74Reserved = rxData[base + 73];
            //ssArr.byte75Reserved = rxData[base + 74];
            //ssArr.byte76Reserved = rxData[base + 75];
        }
    }

    /***
    0        uint8_t             defined                             ;   // 사용유무
    1        uint8_t             status                              ;   // 교차로운영상태
                                                                            0 : 통신이상,
                                                                            1 : 센터모드,
                                                                            2 : 로컬모드,
                                                                            3 : 실패,
                                                                            4 : 전이,
                                                                            5 : 점멸,
                                                                            6 : 소등,
                                                                            7 : 수동진행,
                                                                            8 : 수동점멸,
                                                                            9 : 수동소등,
                                                                            10: 현시유지 
    2-3     uint16_t            intGroup                            ;   // 그룹번호
    4       uint8_t             trcControl                          ;   // TRC제어여부(0:없음, 1:TRC제어) 
    5       uint8_t             overSat                             ;   // 과포화여부(0:없음, 1:과포화) 
    6       uint8_t             maxDS                               ;   // 포화도 
    7       uint8_t             transCount                          ;   // 전이횟수 
    8       uint8_t             reqCycle                            ;   // 요구주기 
    
    9  24   uint8_t             split       [TSCS_RING_MAX] [TSCS_PHASE_MAX]    ;   // 적용현시 
    25 40   uint8_t             lcSplit     [TSCS_RING_MAX] [TSCS_PHASE_MAX]    ;   // 이전현시 
    41 56   uint8_t             trcSplit    [TSCS_RING_MAX] [TSCS_PHASE_MAX]    ;   // Plan Phase 
    57 72   uint8_t             relPt       [TSCS_RING_MAX] [TSCS_PHASE_MAX]    ;   // 해제시간 
    
    73      uint8_t             eoc                                             ;   // End Of Cycle 
    
    74 98   uint8_t             lcStatus    [sizeof(st_lc_status_2010)]         ;
    
    99 106  uint8_t             scuControl  [8]                     ;   // 2016-07-19 by SC.BOO: For PPC Control
    ****/
    // LeeGeon
    // 교차로상태(이전) 복사
    tscsVar.lcStatusArrPrev = deepCopy( tscsVar.lcStatusArr )
    let timeParam = '';
    for( let i = 17; i <= 20; i++){
        let k = 20+17;
        timeParam += toHex(rxData[(k-i)-1])
    }
    // console.log(parseInt(timeParam, 16))
    let timeObj = unixTimestamp(parseInt(timeParam, 16));
    // console.log(timeObj.str)
    // console.log('----------------------------------')
    for ( let i = 0; i < lcMax; i++ ) {
        let base = hdSize + ssSize * saMax + lsSize * i
        const liArr = tscsVar.lcInfoArr[ i ]
        var lsArr = tscsVar.lcStatusArr[ i ]
        
        if ( rxData[ base ] ) {

            lsArr.lcNo = i + 1
            lsArr.isDefined = rxData[ base ] ? true : false
            lsArr.timeObj = timeObj
            lsArr.oprStatus = rxData[ base + 1 ]
            var buf = Buffer.from( [ 0, 0 ] )
            buf[ 0 ] = rxData[ base + 2 ]
            buf[ 1 ] = rxData[ base + 3 ]
            // if ( bigEda ) {
            //     lsArr.saNo = parseInt( buf.readUInt16BE( 0 ).toString( 16 ) )
            // } else {
            //     lsArr.saNo = parseInt( buf.readUInt16LE( 0 ).toString( 16 ) )
            // }

            lsArr.saNo = liArr.saNo

            lsArr.trcControl = rxData[ base + 4 ]
            lsArr.overSat = rxData[ base + 5 ]
            lsArr.maxDs = rxData[ base + 6 ]
            lsArr.transCount = rxData[ base + 7 ]
            lsArr.reqCycle = rxData[ base + 8 ]

            for ( let ring = 0; ring < 2; ring++ ) {
                for ( let phase = 0; phase < 8; phase++ ) {
                    lsArr.splitCur[ ring ][ phase ] = rxData[ base + 9 + ring * 8 + phase ]
                    lsArr.splitPrev[ ring ][ phase ] = rxData[ base + 25 + ring * 8 + phase ]
                    lsArr.splitPlan[ ring ][ phase ] = rxData[ base + 41 + ring * 8 + phase ]
                    lsArr.relPt[ ring ][ phase ] = rxData[ base + 57 + ring * 8 + phase ]
                }
            }

            lsArr.endOfPhase = rxData[ base + 73 ]
            // LC_STATUS 1
            lsArr.powerFail = rxData[ base + 74 ] & 0x80 ? 1 : 0 // Power FAIL 상태 (0: 정상, 1: Power FAIL)
            lsArr.commFail = rxData[ base + 74 ] & 0x40 ? 1 : 0 // MCU와 SCU간 통신 상태 (0: 정상, 1: FAIL)
            //lsArr.dimming = rxData[base + 74] & 0x20 ? 1 : 0; // 조광제어 상태 (0: 정상, 1: 조광 제어중)
            lsArr.ringMode = rxData[ base + 74 ] & 0x10 ? 1 : 0 // RING 운영 방식 (0: SINGLE-RING, 1: DUAL-RING)
            lsArr.oprMode = rxData[ base + 74 ] & 0x07         // 교통신호기 운영 모드 
            // LC_STATUS 2
            lsArr.phaseA = ( ( rxData[ base + 75 ] >> 5 ) & 0x07 ) + 1  // RING A의 PHASE
            lsArr.stepA = ( rxData[ base + 75 ] & 0x1F ) + 1         // RING A의 STEP
            // LC_STATUS 3
            lsArr.phaseB = ( ( rxData[ base + 76 ] >> 5 ) & 0x07 ) + 1  // RING B의 PHASE
            lsArr.stepB = ( rxData[ base + 76 ] & 0x1F ) + 1         // RING B의 STEP
            // LC_STATUS 4
            lsArr.policeIng = rxData[ base + 77 ] & 0x80 ? 1 : 0
            lsArr.policeMan = rxData[ base + 77 ] & 0x40 ? 1 : 0
            lsArr.policeFlash = rxData[ base + 77 ] & 0x20 ? 1 : 0
            lsArr.policeOff = rxData[ base + 77 ] & 0x10 ? 1 : 0
            lsArr.conflict = rxData[ base + 77 ] & 0x08 ? 1 : 0
            lsArr.lightOff = rxData[ base + 77 ] & 0x04 ? 1 : 0
            lsArr.flash = rxData[ base + 77 ] & 0x02 ? 1 : 0
            lsArr.dbError = rxData[ base + 77 ] & 0x01 ? 1 : 0
            // LC_STATUS 5
            lsArr.flashCause = ( rxData[ base + 78 ] >> 4 ) & 0x07
            lsArr.turnLeft = rxData[ base + 78 ] & 0x08 ? 1 : 0
            lsArr.manEnable = rxData[ base + 78 ] & 0x04 ? 1 : 0
            lsArr.conflictEnable = rxData[ base + 78 ] & 0x02 ? 1 : 0
            lsArr.doorOpen = rxData[ base + 78 ] & 0x01 ? 1 : 0
            // LC_STATUS 6
            lsArr.conflictSsr = ( rxData[ base + 79 ] >> 4 ) & 0x0F
            lsArr.conflictCircuit = rxData[ base + 79 ] & 0x7
            // LC_STATUS 11
            lsArr.cycleCount = rxData[ base + 84 ]
            // LC_STATUS 12
            lsArr.cyclePrev = rxData[ base + 85 ]
            // LC_STATUS 13
            lsArr.cycleCurrent = rxData[ base + 86 ]
            // LC_STATUS 14
            lsArr.offset = rxData[ base + 87 ]
            // LC_STATUS 15
            lsArr.holdPhase = rxData[ base + 88 ]
            // LC_STATUS 16
            lsArr.omitPhase = rxData[ base + 89 ]
            // LC_STATUS 17
            lsArr.spillbackPerm = rxData[ base + 90 ] & 0x08 ? 1 : 0
            lsArr.spillbackControlMode = rxData[ base + 90 ] & 0x04 ? 1 : 0
            lsArr.spillbackMainEnd = rxData[ base + 90 ] & 0x02 ? 1 : 0
            lsArr.spillbackSubEnd = rxData[ base + 90 ] & 0x01 ? 1 : 0

            if ( liArr.tcdvType == 1 ) {  // 2004 Version (17 Bytes)
                // LC_STATUS 1
                //lsArr.backNumber = rxData[base + 74] & 0x08; // BANK 번호 (0: BANK 1 & 2, 1: BANK 3 & 4)
                // LC_STATUS 7 ~ 10 Detector Data 채널별현재점유상태 (0: 점유, 1: 비점유)
                for ( let i = 0; i < 8; i++ ) {
                    lsArr.tfdtInfo[ i ] = ( rxData[ base + 80 ] >> i ) & 0x1
                    lsArr.tfdtInfo[ i + 8 ] = ( rxData[ base + 81 ] >> i ) & 0x1
                    lsArr.tfdtInfo[ i + 16 ] = ( rxData[ base + 82 ] >> i ) & 0x1
                    lsArr.tfdtInfo[ i + 24 ] = ( rxData[ base + 83 ] >> i ) & 0x1
                    /*
                    lsArr.tfdtInfo[i     ] = (rxData[base + 80] >> (7 - i)) & 0x1;
                    lsArr.tfdtInfo[i +  8] = (rxData[base + 81] >> (7 - i)) & 0x1;
                    lsArr.tfdtInfo[i + 16] = (rxData[base + 82] >> (7 - i)) & 0x1;
                    lsArr.tfdtInfo[i + 24] = (rxData[base + 83] >> (7 - i)) & 0x1;
                    */
                }
                // LC_STATUS 17
                lsArr.planInfo = lsArr.turnLeft + 1
            } else if ( liArr.tcdvType == 2 ) {   // 2010 Version (25 Bytes)
                // LC_STATUS 1
                //lsArr.ppcEnable = rxData[base + 74] & 0x08; // PPC 제어 상태 (0: 정상, 1: PPC Enabled)
                // LC_STATUS 5
                lsArr.pushButtonEnable = rxData[ base + 78 ] & 0x80 ? 1 : 0
                // LC_STATUS 6
                //lsArr.conflictCause = rxData[base + 79] & 0x8 ? 1 : 0;
                // LS_STATUS 7
                for ( let i = 0; i < 8; i++ ) {
                    lsArr.pedLight[ i ] = ( rxData[ base + 80 ] >> i ) & 0x01
                    //lsArr.pedLight[i] = (rxData[base + 80] >> (7 - i)) & 0x01;
                }
                // LC_STATUS 8
                for ( let i = 0; i < 8; i++ ) {
                    lsArr.buttonCall[ i ] = ( rxData[ base + 81 ] >> i ) & 0x01
                    //lsArr.buttonCall[i] = (rxData[base + 81] >> (7 - i)) & 0x01;
                }
                // LC_STATUS 9
                for ( let i = 0; i < 8; i++ ) {
                    lsArr.buttonMalfunc[ i ] = ( rxData[ base + 82 ] >> i ) & 0x01
                    //lsArr.buttonMalfunc[i] = (rxData[base + 82] >> (7 - i)) & 0x01;
                }
                // LC_STATUS 10
                for ( let i = 0; i < 8; i++ ) {
                    lsArr.optionBoard[ i ] = ( rxData[ base + 83 ] >> i ) & 0x01
                    //lsArr.optionBoard[i] = (rxData[base + 83] >> (7 - i)) & 0x01;
                }
                // LC_STATUS 17
                lsArr.lampType = rxData[ base + 90 ] & 0x80 ? 1 : 0
                lsArr.planInfo = ( ( rxData[ base + 90 ] >> 4 ) & 0x7 ) + 1
                // LC_STATUS 18-19
                //buf[0] = rxData[base + 17];
                //buf[1] = rxData[base + 18];
                //if (bigEda) {
                //lsArr.fwModuleId = parseInt(buf.readUInt16BE(0).toString(16));
                //} else {
                //lsArr.fwModuleId = parseInt(buf.readUInt16LE(0).toString(16));
                //}
                // LC_STATUS 20-21
                // LC_STATUS 22
                lsArr.dbErrorCode = rxData[ base + 95 ]
                // LC_STATUS 23
                lsArr.ppcStandby = rxData[ base + 96 ] & 0x80 ? 1 : 0
                lsArr.ppcEmergency = rxData[ base + 96 ] & 0x40 ? 1 : 0
                lsArr.ppcHoldA = rxData[ base + 96 ] & 0x20 ? 1 : 0
                lsArr.ppcOffA = rxData[ base + 96 ] & 0x10 ? 1 : 0
                lsArr.ppcJumpA = rxData[ base + 96 ] & 0x08 ? 1 : 0
                lsArr.ppcHoldB = rxData[ base + 96 ] & 0x04 ? 1 : 0
                lsArr.ppcOffB = rxData[ base + 96 ] & 0x02 ? 1 : 0
                lsArr.ppcJumpB = rxData[ base + 96 ] & 0x01 ? 1 : 0
                // LC_STATUS 24
                lsArr.upsStatus = rxData[ base + 97 ]  // 24
                // LC_STATUS 25
                lsArr.applyStatus = rxData[ base + 98 ] & 0x01 ? "Diff" : "Etc"
                lsArr.lockStatus1 = rxData[ base + 98 ] & 0x02 ? 1 : 0
                lsArr.lockStatus2 = rxData[ base + 98 ] & 0x04 ? 1 : 0
                lsArr.dbReadOnly = rxData[ base + 98 ] & 0x08 ? "Disable" : "Enable"
                /*
                rxData[base + 74];  // 1
                rxData[base + 75];  // 2
                rxData[base + 76];  // 3
                rxData[base + 77];  // 4
                rxData[base + 78];  // 5
                rxData[base + 79];  // 6
                rxData[base + 80];  // 7
                rxData[base + 81];  // 8
                rxData[base + 82];  // 9
                rxData[base + 83];  // 10
                rxData[base + 84];  // 11
                rxData[base + 85];  // 12
                rxData[base + 86];  // 13
                rxData[base + 87];  // 14
                rxData[base + 88];  // 15
                rxData[base + 89];  // 16
                rxData[base + 90];  // 17
                rxData[base + 91];  // 18
                rxData[base + 92];  // 19
                rxData[base + 93];  // 20
                rxData[base + 94];  // 21
                rxData[base + 95];  // 22
                rxData[base + 96];  // 23
                rxData[base + 97];  // 24
                rxData[base + 98];  // 25
                */
            }
            /*
            if (i == 0) {
                console.log(`RING_A ${lsArr.phaseA}/${lsArr.stepA}, RINB_B ${lsArr.phaseB}/${lsArr.stepB}`);
                console.log(lsArr.splitPrev);
                console.log(lsArr.splitCur);
                console.log(lsArr.splitPlan);
                console.log(lsArr.relPt);
            }
            */
        }

        else {

            if( ( liArr.lcNo > 0 ) && ( liArr.mainLcNo == 0 ) ) {

                lsArr.lcNo = i + 1
                lsArr.saNo = liArr.saNo
            }
        }
    }

}

function deepCopy ( obj )
{
    if ( obj === null || typeof ( obj ) !== "object" ) {
        return obj
    }

    let copy = {}
    for ( let key in obj ) {
        copy[ key ] = deepCopy( obj[ key ] )
    }

    return copy
}
function toHex(d) {
    return ("0" + Number(d).toString(16)).slice(-2).toUpperCase();
}
function addZero(date){
    let result = "";
    if(Number(date) < 10){
        result = "0" + Number(date).toString();
    }else {
        result = Number(date).toString();;
    }
    return result;
}

function unixTimestamp(t){
    const date = new Date(t*1000);
    const year = date.getFullYear();
    const month = "0" + (date.getMonth()+1);
    const day = "0" + date.getDate();
    const hour = "0" + date.getHours();
    const minute = "0" + date.getMinutes();
    const second = "0" + date.getSeconds();
    const weekArr = [
        {
            str : '일'
          , code : 1
        },{
            str : '월'
          , code : 2
        },{
            str : '화'
          , code : 3
        },{
            str : '수'
          , code : 4
        },{
            str : '목'
          , code : 5
        },{
            str : '금'
          , code : 6
        },{
            str : '토'
          , code : 7
        }
    ];
    const week = weekArr[date.getDay()].str;
    const weekCode = weekArr[date.getDay()].code;
    const result = {
          year : year
        , month : addZero(month)
        , day : addZero(day)
        , hour : addZero(hour)
        , minute : addZero(minute)
        , second : addZero(second)
        , week : week
        , weekCode : weekCode
        , str : year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2) + " " + week + "요일"
    }
    return result;
}
// EOF tscsParser.js
