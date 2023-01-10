'user strict'

var moment = require( 'moment' )
var constants = require( './constants' )

let variables = {}

////////////////////////////////////////////////////////////////////////////////////////////////////
// 교차로 현황
class LcCount {
    constructor() {
        this.time = "" // 시간
        this.total = 0 // 전체 교차로 개수
        this.used = 0 // 운영 교차로 개수(사용)
        this.unused = 0 // 비운영 교차로 개수(사용안함)

        this.scuFixCycle = 0 // SCU고정주기 개수
        this.localNoAct = 0 // 로컬-무감응 개수
        this.localAct = 0 // 로컬-감응 개수
        this.halfAct = 0 // 반감응 개수
        this.centerAct = 0 // 센터-감응 개수
        this.centerNoAct = 0 // 센터-무감응 개수

        this.phaseHold = 0 // 현시유지 개수
        this.transition = 0 // 전이 개수
        this.commFail = 0 // 통신이상 개수
        this.lightOff = 0 // 소등 개수
        this.flash = 0 // 점멸 개수
        this.manual = 0 // 수동 개수
        this.conflict = 0 // 모순 개수
        this.doorOpen = 0 // 함체문 열림 개수
        this.conflictEnable = 0 // 모순감지불가 개수
        this.ppcMode = 0 // PPC모드 개수
        this.forceTod = 0 // 강제TOD 개수
    }

    // 모든 값을 0으로 초기화 하는 함수
    setAllZero () {
        this.time = "" // 시간
        this.total = 0 // 전체 교차로 개수
        this.used = 0 // 운영 교차로 개수(사용)
        this.unused = 0 // 비운영 교차로 개수(사용안함)
        this.scuFixCycle = 0 // SCU고정주기 개수
        this.localNoAct = 0 // 로컬-무감응 개수
        this.localAct = 0 // 로컬-감응 개수
        this.halfAct = 0 // 반감응 개수
        this.centerAct = 0 // 센터-감응 개수
        this.centerNoAct = 0 // 센터-무감응 개수
        this.phaseHold = 0 // 현시유지 개수
        this.transition = 0 // 전이 개수
        this.commFail = 0 // 통신이상 개수
        this.lightOff = 0 // 소등 개수
        this.flash = 0 // 점멸 개수
        this.manual = 0 // 수동 개수
        this.conflict = 0 // 모순 개수
        this.doorOpen = 0 // 함체문 열림 개수
        this.conflictEnable = 0 // 모순감지불가 개수
        this.ppcMode = 0 // PPC모드 개수
        this.forceTod = 0 // 강제TOD 개수
    }
}

// 교차로 현황 객체 생성
let lcCount = new LcCount()

////////////////////////////////////////////////////////////////////////////////////////////////////
// 그룹감시 기준 '그룹 상태' 클래스
class SaStatus {
    constructor() {
        this.isDefined = false // 사용유무
        // 그룹운영현황
        this.saCtrlMode = 0 // 제어모드(0:TOD, 1:TRC, 2:MAN, 3:TRC2)
        this.cycle = 0 // 주기
        this.offset = 0 // 옵셋(1 ~ 16)
        this.split = 0 // 스플릿(1 ~ 16)
        this.lcCount = 0 // (소속)교차로 개수
        this.centerCount = 0 // 센터모드 개수
        this.transCount = 0 // 전이모드 개수
        this.localCount = 0 // 로컬모드 개수
        this.noRespCount = 0 // 응답없음 개수
        this.commFailCount = 0 // 통신두절 개수
        this.malfuncCount = 0 // 고장상태 개수 - mcu2scu, stateDatabase,stateConflict, powerFail이 1인 경우
        this.flashCount = 0 // 점멸운영 개수
        this.manCount = 0 // 수동운영 개수
        // 그룹감시
        this.saStatus = 0 // 제어상태(0: 로컬, 1: 센터)
        // this.saCtrlMode = 0; // 제어모드(0: TOD, 1: TRC, 2: Manual, 3: TRC2)
        this.trcPlanReady = 0 // TRC 계획 준비(0: 공백, 1: 준비)
        this.todPlanReady = 0 // TOD 계획 준비(0: 공백, 1: 준비)
        this.manPlanReady = 0 // 수동 계획 준비(0: 공백, 1: 준비)
        this.trcAvailable = 0 // TRC 제어가능(0: 불가능, 1: 가능)
        this.readyToControl = 0 // TRC 운영(0: 미실시, 1: 실시)
        this.modeChange = 0 // 전환 모드(0: 공백, 1: TOD로 전환, 2: TRC로 전환, 3: TRC2로 전환)
        this.trcErrorCount = 0 // TRC 에러수
        this.reqCycleLevel = 0 // 요구주기레벨
        this.reqDirection = 0 // 연동요구방향(0: 공백, 1: 유입, 2: 균둥, 3: 유출)
        this.ciDataReady = 0 // CI 자료 준비(0: 공백, 1: 준비)
        this.spHoldCount = 0 // 스플릿전이요구수
        this.offsetReqCount = 0 // 옵셋전이요구수
        this.cycleReqCount = 0 // 주기전이요구수
        this.iorate = 0 // I/O비율(단위 : %)
        this.oiRatio = 0 // O/I 비율(단위 : %)
        // 우상단 그리드
        // 현재
        this.curDayPlan = 0 // 일계획 → 사용안함
        this.curTimePlan = 0 // 시간계획
        this.curCycleLength = 0 // 주기
        this.curSplit = 0 // 스플릿패턴
        this.curOffset = 0 // 옵셋패턴
        this.curLevel = 0 // 주기레벨 → 사용안함
        this.curCycleCount = 0 // 그룹카운트
        // TOD
        this.todDayPlan = 0 // 일계획
        this.todTimePlan = 0 // 시간계획
        this.todCycleLength = 0 // 주기
        this.todSplit = 0 // 스플릿패턴
        this.todOffset = 0 // 옵셋패턴
        this.todLevel = 0 // = 주기레벨
        this.todCycleCount = 0 // 그룹카운트 → 사용안함
        // TRC
        this.trcDayPlan = 0 // 일계획
        this.trcTimePlan = 0 // 시간계획
        this.trcCycleLength = 0 // 주기
        this.trcSplit = 0 // 스플릿패턴
        this.trcOffset = 0 // 옵셋패턴
        this.trcLevel = 0 // = 주기레벨
        this.trcCycleCount = 0 // 그룹카운트 → 사용안함
        // TRC정보
        this.trcInfoDayPlan = 0 // 일계획 → 사용안함
        this.trcInfoTimePlan = 0 // 시간계획 → 사용안함
        this.trcInfoCycleLength = 0 // 주기
        this.trcInfoSplit = 0 // 스플릿패턴
        this.trcInfoOffset = 0 // 옵셋패턴
        this.trcInfoLevel = 0 // = 주기레벨 → 사용안함
        this.trcInfoCycleCount = 0 // 그룹카운트 → 사용안함
        // 수동
        this.manDayPlan = 0 // 일계획 → 사용안함
        this.manTimePlan = 0 // 시간계획 → 사용안함
        this.manCycleLength = 0 // 주기
        this.manSplit = 0 // 스플릿패턴
        this.manOffset = 0 // 옵셋패턴
        this.manLevel = 0 // = 주기레벨
        this.manCycleCount = 0 // 그룹카운트 → 사용안함
        // 결합 1방향
        this.merged1 = false // 결합여부
        this.mgCount1 = 0 // 결합그룹수
        this.dvCount1 = 0 // 결합분리그룹수
        this.reqCycle1 = 0 // 결합요구주기
        // 결합 2방향
        this.merged2 = false // 결합여부
        this.mgCount2 = 0 // 결합그룹수
        this.dvCount2 = 0 // 결합분리그룹수
        this.reqCycle2 = 0 // 결합요구주기
        // 결합 3방향
        this.merged3 = false // 결합여부
        this.mgCount3 = 0 // 결합그룹수
        this.dvCount3 = 0 // 결합분리그룹수
        this.reqCycle3 = 0 // 결합요구주기
        // 결합 4방향
        this.merged4 = false // 결합여부
        this.mgCount4 = 0 // 결합그룹수
        this.dvCount4 = 0 // 결합분리그룹수
        this.reqCycle4 = 0 // 결합요구주기
    }

    static toString ( variableName, value ) {
        switch ( variableName ) {
            // 사용유무
            case "isDefined": {
                switch ( value ) {
                    case true:
                        return "운영함"
                    case false:
                        return "운영안함"
                }
            }
            // 제어모드
            case "saCtrlMode": {
                switch ( value ) {
                    case 0:
                        return "TOD"
                    case 1:
                        return "TRC"
                    case 2:
                        return "Manual"
                    case 3:
                        return "TRC2"
                }
            }
            // 제어상태
            case "saStatus": {
                switch ( value ) {
                    case 0:
                        return "로컬"
                    case 1:
                        return "센터"
                }
            }
        }
    }
}

// 현재 '그룹 정보' 배열 선언
var saStatusArr = new Array( constants.MAX_SA_COUNT )
for ( let i = 0; i < constants.MAX_SA_COUNT; i++ ) {
    saStatusArr[ i ] = new SaStatus()
}

// 이전 '그룹 정보' 배열 선언
var saStatusArrPrev = new Array( constants.MAX_SA_COUNT )
for ( let i = 0; i < constants.MAX_SA_COUNT; i++ ) {
    saStatusArrPrev[ i ] = new SaStatus()
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// 그룹구성정보 기준 '그룹 정보' 클래스
class SaInfo {
    constructor() {
        this.saNo = 0 // 그룹번호
        this.isUsed = false // 그룹사용여부
        this.saName = "" // 그룹이름
        this.saCtrlMode = 0 // 그룹제어모드(0: TOD, 1: TRC)
        this.minOperateCycle = 0 // 최소주기유지수
        this.phaseFactor = 0 // 현시조정상수
        this.offsetAdjstFactor = 0 // 옵셋조정상수
        this.trcCntl1 = 0 // TOD-주기(TRC)(0: 미체크, 1: 체크)
        this.trcCntl2 = 0 // TOD-옵셋(TRC)(0: 미체크, 1: 체크)
        this.autoOnlineReq = 0 // 자동센터모드(0: 미체크, 1: 체크)
        this.minCycleLevel = 0 // 최소주기레벨
        this.maxCycleLevel = 0 // 최대주기레벨
        this.cycleMtd = 0 // 주기전환방법(0: DEFAULT사용, 1: 주기전환범위)
        this.cycleRng = 0 // 주기전환범위
        this.cycleTransMtd = 0 // 전이방법(0: 단계, 1: 즉시)
        this.cycleTimeSetMtd = 0 // 기준시각(0: 시스템, 1: 그룹)
        // this.regFlag = 0; // 그룹사용여부(0: 미사용, 1: 사용)
        this.saJoinMtd = 0 // 그룹결합방법
        this.saJoinVariable1 = 0 // 축결정변수1
        this.saJoinVariable2 = 0 // 축결정변수2
        this.saJoinVariable3 = 0 // 축결정변수3
        this.saJoinVariable4 = 0 // 축결정변수4
        this.saJoinVariable5 = 0 // 축결정변수5
        this.saJoinVariable6 = 0 // 축결정변수6
    }

    setAllZero () {
        this.saNo = 0 // 그룹번호
        this.isUsed = false // 그룹사용여부
        this.saName = "" // 그룹이름
        this.saCtrlMode = 0 // 그룹제어모드(0: TOD, 1: TRC)
        this.minOperateCycle = 0 // 최소주기유지수
        this.phaseFactor = 0 // 현시조정상수
        this.offsetAdjstFactor = 0 // 옵셋조정상수
        this.trcCntl1 = 0 // TOD-주기(TRC)(0: 미체크, 1: 체크)
        this.trcCntl2 = 0 // TOD-옵셋(TRC)(0: 미체크, 1: 체크)
        this.autoOnlineReq = 0 // 자동센터모드(0: 미체크, 1: 체크)
        this.minCycleLevel = 0 // 최소주기레벨
        this.maxCycleLevel = 0 // 최대주기레벨
        this.cycleMtd = 0 // 주기전환방법(0: DEFAULT사용, 1: 주기전환범위)
        this.cycleRng = 0 // 주기전환범위
        this.cycleTransMtd = 0 // 전이방법(0: 단계, 1: 즉시)
        this.cycleTimeSetMtd = 0 // 기준시각(0: 시스템, 1: 그룹)
        // this.regFlag = 0; // 그룹사용여부(0: 미사용, 1: 사용)
        this.saJoinMtd = 0 // 그룹결합방법
        this.saJoinVariable1 = 0 // 축결정변수1
        this.saJoinVariable2 = 0 // 축결정변수2
        this.saJoinVariable3 = 0 // 축결정변수3
        this.saJoinVariable4 = 0 // 축결정변수4
        this.saJoinVariable5 = 0 // 축결정변수5
        this.saJoinVariable6 = 0 // 축결정변수6
    }
}

// '그룹 정보' 배열 선언
var saInfoArr = new Array( constants.MAX_SA_COUNT )
for ( let i = 0; i < constants.MAX_SA_COUNT; i++ ) {
    saInfoArr[ i ] = new SaInfo()
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// 교차로감시 기준 '교차로 상태' 클래스
class LcStatus {
    constructor() {
        this.isDefined = false // 사용유무
        // 일반
        this.lcNo = 0 // 교차로번호 → 사용안함!!!
        // 현시운영정보
        this.splitPrev = [ [ 0, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0, 0, 0 ] ] // 이전현시
        this.splitCur = [ [ 0, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0, 0, 0 ] ] // 적용현시
        this.splitPlan = [ [ 0, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0, 0, 0 ] ] // 계획현시
        this.relPt = [ [ 0, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0, 0, 0 ] ] // 해제시간
        this.endOfPhase = 0 // 주기종료(0: 주기중, 1: 주기종료)
        this.planInfo = 0 // 신호맵구분(시차제구분)
        this.phaseA = 0 // A링 현시(1 ~ 8)
        this.phaseB = 0 // B링 현시(1 ~ 8)
        // 운영정보
        this.oprStatus = 0 // (현재)운영상태
        this.oprStatusPrev = 0 // (이전)운영상태
        this.oprTime = "" // 운영시각
        this.oprMode = 0 // 운영모드(0: SCU고정주기, 1: 로컬-무감응, 2: 로컬-감응, 3: 반감응, 4: 센터-감응, 5: 센터-무감응, 6: 통신이상)
        this.ringMode = 0 // 링운영모드(0: SINGLE, 1: DUAL)
        // this.planInfo = 0; // 시차제구분 →위에서 정의
        this.transCount = 0 // 전이횟수
        this.cycleCount = 0 // 주기카운트
        this.phaseCountFixValue = 0 // ?
        this.savePhaseCount = 0 // ?
        this.saveStepA = 0 // ?
        this.cyclePrev = 0 // 이전주기
        this.cycleCurrent = 0 // 현재주기
        this.offset = 0 // 옵셋
        // this.phaseA = 0; // A링 현시 →위에서 정의
        // this.phaseB = 0; // B링 현시 →위에서 정의
        this.stepA = 0 // A링 스텝(1 ~ 32)
        this.stepB = 0 // B링 스텝(1 ~ 32)
        this.holdPhase = 0 // 유지현시
        this.omitPhase = 0 // 생략현시
        this.doorOpen = 0 // 함체문열림(0: 닫힘, 1: 열림)
        this.dbError = 0 // DB상태(0: 정상, 1: 이상)
        this.manEnable = 0 // 수동가능여부(0: DISABLE, 1: ENABLE)
        this.conflictEnable = 0 // 모순감지여부(0: DISABLE, 1: ENABLE)
        this.powerFail = 0 // 전원상태(0: 정상, 1: Fail)
        // 확장
        //운영정보
        this.saNo = 0 // 그룹번호
        this.trcControl = 0 // TRC가능여부(0: 불가능, 1: 가능)
        this.maxDs = 0 // 포화도
        this.overSat = 0 // 과포화여부(0: 없음, 1: 과포화)
        this.reqCycle = 0 // 요구주기
        this.policeIng = 0 // P.수동진행SW(0: OFF, 1: ON)
        this.policeMan = 0 // P.수동SW(0: OFF, 1: ON)
        this.policeFlash = 0 // P.점멸SW(0: OFF, 1: ON)
        this.policeOff = 0 // P.소등SW(0: OFF, 1: ON)
        this.commFail = 0 // SCU통신(0: 정상, 1: Fail)
        this.lightOff = 0 // 소등상태(0: 정상, 1: 소등)
        this.flash = 0 // 점멸여부(0: 정상, 1: 점멸)
        this.flashCause = 0 // 점멸동작원인(1: 초기화동작 점멸, 2: 명령에 의한 점멸, 3: 수동 점멸, 4: 모순 점멸, 5: DB 에러 점멸, 6: 소등 점멸)
        this.turnLeft = 0 // 시차제(0: 수행 안함, 1: 수행중)
        this.conflict = 0 // 모순상태(0: 정상, 1: 모순)
        this.conflictSsr = 0 // 모순발생SSR(0 ∼ 15)
        this.conflictCircuit = 0 // 모순발생 회로
        // └(3색: 0:R1, 1:Y1, 2:G1, 3:R2, 4:Y2, 5:G2, 6:BUS ERROR / 4색: 0:PR, 1:PG, 2:R, 3:Y, 4:A, 5:G)
        // 앞막힘 제어정보
        this.spillbackControlMode = 0 // 제어방법(0: MG무시, 1: MG유지)
        this.spillbackMainEnd = 0 // 주현시조기종결(0: 없음, 1: 발생)
        this.spillbackSubEnd = 0 // 부현시조기종결(0: 없음, 1: 발생)
        this.spillbackPerm = 0 // 허용권 상태/앞막힘허용(0: 없음, 1: 제어중)
        // 확장정보 2004년형
        this.tfdtInfo =
            [ 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0 ] // 검지기 점유 상태(1~32) (0: 비점유, 1: 점유)
        // 확장정보 2010년형
        this.lampType = 0 // 등기구유형(등기종류)(0: 3색, 1: 4색)
        this.dbErrorCode = 0 // DB 이상 상태
        this.dbReadOnly = 0 // DB 쓰기 여부
        this.lockStatus = "" // 잠금장치상태정보 ※아래 두개의 조합으로 생성
        this.lockStatus1 = 0
        this.lockStatus2 = 0
        this.applyStatus = 0 // 맵수정시반영여부
        // PPC 제어상태
        this.ppcControl = 0 // PPC제어(0: 불가능, 1: 가능)
        this.ppcStandby = 0 // 상태-Standby(0: Standby, 1: In Service)
        this.ppcEmergency = 0 // 상태-긴급(0: 긴급, 1: BUS)
        this.ppcHoldA = 0 // A링-Hold
        this.ppcOffA = 0 // A링-Off
        this.ppcJumpA = 0 // A링-Jump
        this.ppcHoldB = 0 // B링-Hold
        this.ppcOffB = 0 // B링-Off
        this.ppcJumpB = 0 // B링-Jump
        this.upsStatus = "" // UPS 제어상태
        // 확장정보(그리드)
        this.pedLight = [ 0, 0, 0, 0, 0, 0, 0, 0 ] // 보행등 출력상태
        this.buttonCall = [ 0, 0, 0, 0, 0, 0, 0, 0 ] // 푸시버튼 입력상태
        this.buttonMalfunc = [ 0, 0, 0, 0, 0, 0, 0, 0 ] // 보행자 작동장치 고장상태
        this.boardId = [ 0, 0, 0, 0, 0, 0, 0, 0 ] // 보드 ID
        this.optionBoard = [ 0, 0, 0, 0, 0, 0, 0, 0 ] // 옵션보드 고장상태
        // 기타
        this.pushButtonEnable = 0 // 푸시버튼 여부(0: 비활성 또는 설치안됨, 1: 활성상태) 2010!
        this.isActuated = false
        this.ppcFlags = 0 // Byte
        this.upsFlags = 0 // Byte
        this.ppcControlMode = 0 // Byte
        this.timeObj = {
            year: ""
            , month: ""
            , day: ""
            , hour: ""
            , minute: ""
            , second: ""
            , week: ""
            , weekCode: ""
            , str: ""
        }
    }

    static toString ( variableName, value ) {
        switch ( variableName ) {
            // 사용유무
            case "isDefined": {
                switch ( value ) {
                    case true: return "운영함"
                    case false: return "운영안함"
                }
            }
            // 주기종료
            case "endOfPhase": {
                switch ( value ) {
                    case 0: return "주기중"
                    case 1: return "주기종료"
                }
            }
            // 신호맵구분(2004)
            case "planInfo2004": {
                switch ( value ) {
                    case 1: return "일반제"
                    case 2: return "시차제"
                }
            }
            // 신호맵구분(2010)
            case "planInfo2010": {
                switch ( value ) {
                    case 1: return "일반제"
                    case 2: return "시차제1"
                    case 3: return "시차제2"
                    case 4: return "시차제3"
                    case 5: return "시차제4"
                    case 6: return "시차제5"
                    case 7: return "전용맵"
                    case 8: return "예약"
                }
            }
            // 운영상태
            case "oprStatus": {
                switch ( value ) {
                    case 0: return "통신이상"
                    case 1: return "센터-무감응"
                    case 2: return "로컬-무감응"
                    case 3: return "실패"
                    case 4: return "전이"
                    case 5: return "점멸"
                    case 6: return "소등"
                    case 7: return "수동진행"
                    case 8: return "수동점멸"
                    case 9: return "수동소등"
                    case 10: return " 현시유지"
                    case 11: return " SCU모드"
                    case 12: return " PPC모드"
                    case 13: return " 감응제어(해당없음)"
                    case 14: return " 강제TOD"
                    case 15: return " 센터-감응"
                    case 16: return " 로컬-감응"
                }
            }
            // 운영모드
            case "oprMode": {
                switch ( value ) {
                    case 0: return "SCU고정주기"
                    case 1: return "로컬-무감응"
                    case 2: return "로컬-감응"
                    case 3: return "반감응"
                    case 4: return "센터-감응"
                    case 5: return "센터-무감응"
                    case 6: return "통신이상"
                }
            }
            // 링운영모드
            case "ringMode": {
                switch ( value ) {
                    case 0: return "SINGLE"
                    case 1: return "DUAL"
                }
            }
            // 함체문열림
            case "doorOpen": {
                switch ( value ) {
                    case 0: return "닫힘"
                    case 1: return "열림"
                }
            }
            // DB상태
            case "dbError": {
                switch ( value ) {
                    case 0: return "정상"
                    case 1: return "이상"
                }
            }
            // 수동가능여부
            case "manEnable": {
                switch ( value ) {
                    case 0: return "DISABLE"
                    case 1: return "ENABLE"
                }
            }
            // 모순감지여부
            case "conflictEnable": {
                switch ( value ) {
                    case 0: return "DISABLE"
                    case 1: return "ENABLE"
                }
            }
            // 전원상태
            case "powerFail": {
                switch ( value ) {
                    case 0: return "정상"
                    case 1: return "Fail"
                }
            }
            // TRC가능여부
            case "trcControl": {
                switch ( value ) {
                    case 0: return "불가능"
                    case 1: return "가능"
                }
            }
            // 과포화여부
            case "overSat": {
                switch ( value ) {
                    case 0: return "없음"
                    case 1: return "과포화"
                }
            }
            // P.수동진행SW
            case "policeIng": {
                switch ( value ) {
                    case 0: return "OFF"
                    case 1: return "ON"
                }
            }
            // P.수동SW
            case "policeMan": {
                switch ( value ) {
                    case 0: return "OFF"
                    case 1: return "ON"
                }
            }
            // P.점멸SW
            case "policeFlash": {
                switch ( value ) {
                    case 0: return "OFF"
                    case 1: return "ON"
                }
            }
            // P.소등SW
            case "policeOff": {
                switch ( value ) {
                    case 0: return "OFF"
                    case 1: return "ON"
                }
            }
            // 소등상태
            case "lightOff": {
                switch ( value ) {
                    case 0: return "정상"
                    case 1: return "소등"
                }
            }
            // 점멸여부
            case "flash": {
                switch ( value ) {
                    case 0: return "정상"
                    case 1: return "점멸"
                }
            }
            // 점멸동작원인
            case "flashCause": {
                switch ( value ) {
                    case 1: return "초기화동작 점멸"
                    case 2: return "명령에 의한 점멸"
                    case 3: return "수동 점멸"
                    case 4: return "모순 점멸"
                    case 5: return "DB 에러 점멸"
                    case 6: return "소등 점멸"
                }
            }
            // 시차제
            case "turnLeft": {
                switch ( value ) {
                    case 0: return "수행 안함"
                    case 1: return "수행중"
                }
            }
            // 모순상태
            case "conflict": {
                switch ( value ) {
                    case 0: return "정상"
                    case 1: return "모순"
                }
            }
            // 모순발생 회로(3색)
            case "conflictCircuit3": {
                switch ( value ) {
                    case 0: return "R1"
                    case 1: return "Y1"
                    case 2: return "G1"
                    case 3: return "R2"
                    case 4: return "Y2"
                    case 5: return "G2"
                    case 6: return "BUS ERROR"
                }
            }
            // 모순발생 회로(4색)
            case "conflictCircuit4": {
                switch ( value ) {
                    case 0: return "PR"
                    case 1: return "PG"
                    case 2: return "R"
                    case 3: return "Y"
                    case 4: return "A"
                    case 5: return "G"
                }
            }
            // 앞막힘 제어방법
            case "spillbackControlMode": {
                switch ( value ) {
                    case 0: return "MG무시"
                    case 1: return "MG유지"
                }
            }
            // 앞막힘 주현시조기종결
            case "spillbackMainEnd": {
                switch ( value ) {
                    case 0: return "없음"
                    case 1: return "발생"
                }
            }
            // 앞막힘 부현시조기종결
            case "spillbackSubEnd": {
                switch ( value ) {
                    case 0: return "없음"
                    case 1: return "발생"
                }
            }
            // 앞막힘 허용권상태
            case "spillbackPerm": {
                switch ( value ) {
                    case 0: return "없음"
                    case 1: return "제어중"
                }
            }
            // 등기구유형
            case "lampType": {
                switch ( value ) {
                    case 0: return "3색"
                    case 1: return "4색"
                }
            }
            // PPC제어
            case "ppcControl": {
                switch ( value ) {
                    case 0: return "불가능"
                    case 1: return "가능"
                }
            }
            // PPC 상태-Standby
            case "ppcStandby": {
                switch ( value ) {
                    case 0: return "Standby"
                    case 1: return "In Service"
                }
            }
            // PPC 상태-긴급
            case "ppcEmergency": {
                switch ( value ) {
                    case 0: return "긴급"
                    case 1: return "BUS"
                }
            }
            // 푸시버튼 여부
            case "pushButtonEnable": {
                switch ( value ) {
                    case 0: return "비활성 또는 설치안됨"
                    case 1: return "활성상태"
                }
            }
        }
    }
}

// 현재 '교차로 상태' 배열 선언
var lcStatusArr = new Array( constants.MAX_LC_COUNT )
for ( let i = 0; i < constants.MAX_LC_COUNT; i++ ) {
    lcStatusArr[ i ] = new LcStatus()
}

// 이전 '교차로 상태' 배열 선언
var lcStatusArrPrev = new Array( constants.MAX_LC_COUNT )
for ( let i = 0; i < constants.MAX_LC_COUNT; i++ ) {
    lcStatusArrPrev[ i ] = new LcStatus()
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// 교차로구성정보 기준 '교차로 정보' 클래스
class LcInfo {
    constructor() {
        this.lcNo = 0 // 교차로번호
        this.isUsed = false // 사용유무(true: 사용, false: 미사용)
        this.nodeId = "" // 노드번호
        this.lcName = "" // 교차로이름
        this.lcType = 0 // 교차로유형(0: MI, 1: CI, 2: SCI, 3: 램프, 4: 연등)
        this.tcdvType = 0 // 제어기유형(1: 2004, 2: 2010)
        this.lampType = 0 // 등기구유형(0: 3색 등화기, 1: 4색 등화기)
        this.mcuFwId = "" // MCU 펌웨어 ID
        this.scuFwId = "" // SCU 펌웨어 ID
        this.deltaLimit = 0 // 델타허용값
        this.transCycle = 0 // 전이주기수
        this.autoError = 0 // 자동오류보정방법(0: 복구안함, 1: 주기에러, 2: 전이에러, 3: 모든에러)
        this.autoOnline = 0 // 자동센터모드(0: 수동, 1: 자동)
        this.commType = 0 // 통신방식(0: TCP Client, 1: TCP Server, 2: Serial)
        this.ip = "" // IP주소/디바이스 이름
        this.port = 0 // 포트번호
        this.fepNo = 0 // FEP번호
        this.mainLcNo = 0 // 주요 교차로(연등일 때)
        this.algLcNo = 0 // 알고리즘 교차로
        this.saNo = 0 // 그룹번호
        this.saIndex = 0 // 그룹순번
    }

    setAllZero () {
        this.lcNo = 0 // 교차로번호
        this.isUsed = false // 사용유무(true: 사용, false: 미사용)
        this.nodeId = "" // 노드번호
        this.lcName = "" // 교차로이름
        this.lcType = 0 // 교차로유형(0: MI, 1: CI, 2: SCI, 3: 램프, 4: 연등)
        this.tcdvType = 0 // 제어기유형(1: 2004, 2: 2010)
        this.lampType = 0 // 등기구유형(0: 3색 등화기, 1: 4색 등화기)
        this.mcuFwId = "" // MCU 펌웨어 ID
        this.scuFwId = "" // SCU 펌웨어 ID
        this.deltaLimit = 0 // 델타허용값
        this.transCycle = 0 // 전이주기수
        this.autoError = 0 // 자동오류보정방법(0: 복구안함, 1: 주기에러, 2: 전이에러, 3: 모든에러)
        this.autoOnline = 0 // 자동센터모드(0: 수동, 1: 자동)
        this.commType = 0 // 통신방식(0: TCP Client, 1: TCP Server, 2: Serial)
        this.ip = "" // IP주소/디바이스 이름
        this.port = 0 // 포트번호
        this.fepNo = 0 // FEP번호
        this.mainLcNo = 0 // 주요 교차로(연등일 때)
        this.algLcNo = 0 // 알고리즘 교차로
        this.saNo = 0 // 그룹번호
        this.saIndex = 0 // 그룹순번        
    }
}

// '교차로 정보' 배열 선언
var lcInfoArr = new Array( constants.MAX_LC_COUNT )
for ( let i = 0; i < constants.MAX_LC_COUNT; i++ ) {
    lcInfoArr[ i ] = new LcInfo()
}

////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////

// 클래스 내보내기
// variables.SaInfo = SaInfo;
// variables.LcInfo = LcInfo;
variables.SaStatus = SaStatus
variables.LcStatus = LcStatus

// 교차로 현황
variables.lcCount = lcCount

// 그룹 상태 & 그룹 정보
variables.saStatusArr = saStatusArr // 현재상태
variables.saStatusArrPrev = saStatusArrPrev // 이전상태
variables.saInfoArr = saInfoArr

// 교차로 상태 & 교차로 정보
variables.lcStatusArr = lcStatusArr // 현재상태
variables.lcStatusArrPrev = lcStatusArrPrev // 이전상태
variables.lcInfoArr = lcInfoArr


module.exports = variables
