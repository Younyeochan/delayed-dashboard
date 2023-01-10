'use strict';

let constants = {};

// LeeGeon

// DB 응답관련
constants.RESULT_STRING = {
    // 로그인 관련
    LOGIN1: '아이디, 패스워드를 확인해 주세요.',
    LOGIN2: '동일한 아이디가 여러개 검지되었습니다! DB를 확인해 주세요.',

    // DB 관련
    DB1: '쿼리가 유효하지 않습니다.',
    DB2: '개의 데이터를 찾았습니다.',
    DB3: '개의 행에 적용되었습니다.',
    DB4: '전체 검지기 현황 조회에 성공하였습니다.',

    // 제어기 관련
    RC1: '데이터가 없습니다.',
    RC2: '전체 교차로 현황 조회에 성공하였습니다.',
    RC3: '교차로 운영상태 조회에 성공하였습니다.',
    RC4: '실시간 이벤트 조회에 성공하였습니다.',

    // 벨리데이션 관련
    VALIDATION1: '파라미터가 유효하지 않습니다.',
    VALIDATION2: '유저키가 유효하지 않습니다.'
}

// 최대 개수
constants.MAX_SA_COUNT = 400; // 여기 바꿔야함 == 그룹 초기화 수
constants.MAX_LC_COUNT = 1024; // 여기 바꿔야함 == 교차로 초기화 수

constants.COUNT_RING = 2;  // Ring A, Ring B
constants.COUNT_PHASE = 8;  // 8현시
constants.COUNT_MOVEMENT = 18; // 1 ~ 16, 17, 18
constants.COUNT_GENNDIFF2004 = 2;
constants.COUNT_GENNDIFF2010 = 7;
// 2004: 일반제, 시차제
// 2010: 일반제, 시차제#1, 시차제#2, 시차제#3, 시차제#4, 시차제#5, 보행맵

// 그룹운영상태 grp_state.status
constants.SA_STATUS_LOCAL = 0; // 로컬
constants.SA_STATUS_CENTER = 1; // 센터

// 그룹신호모드     grp_state.mode
constants.SA_MODE_TOD = 0; // TOD
constants.SA_MODE_TRC = 1; // TRC
constants.SA_MODE_MAN = 2; // MAN
constants.SA_MODE_TRC2 = 3; // TRC2

// 교차로운영상태   lc_state.status
// oprstatus
// 아래에

// TRC제어여부   lc_state.trcControl
constants.LC_TRC_CONTRL_N = 0; // 없음
constants.LC_TRC_CONTRL_Y = 1; // TRC제어

// 교통신호기 운영 모드 lc_state.lcst.oprMode
// oprmode
constants.LC_OPRMODE_SCU_FIXCYCLE = 0; // SCU 고정주기 모드
constants.LC_OPRMODE_LOCAL_NOACT = 1; // 로컬-무감응
constants.LC_OPRMODE_LOCA_ACT = 2; // 로컬-감응
constants.LC_OPRMODE_HALF_ACT = 3; // 반감응
constants.LC_OPRMODE_CENTER_ACT = 4; // 센터-감응
constants.LC_OPRMODE_CENTER_NOACT = 5; // 센터-무감응
constants.LC_OPRMODE_COMM_FAIL = 6; // 통신이상
/*
  LC_OPRMODE_SCU_FIXCYCLE  = 0; // SCU 고정주기 모드
  LC_OPRMODE_NOACT_OFFLINE = 1; // 감응하지 않는 OFFLINE 제어모드
  LC_OPRMODE_ACT_OFFLINE   = 2; // 감응되는 OFFLINE 제어모드
  LC_OPRMODE_HALF_ACT      = 3; // 반감응 제어모드
  LC_OPRMODE_ACT_ONLINE    = 4; // 감응되는 온라인 제어모드
  LC_OPRMODE_NOACT_ONLINE  = 5; // 감응하지 않는 온라인 제어모드
  LC_OPRMODE_COMM_FAIL     = 6; // 감응하지 않는 온라인 제어모드
*/

// 점멸동작원인     lc_state.lcst.flashCause
constants.LC_FLASH_CAUSE_POWERON = 1; // Power ON FLASH(초기화동작 점멸)
constants.LC_FLASH_CAUSE_NORMAL = 2; // NORMAL FLASH(명령에 의한 점멸)
constants.LC_FLASH_CAUSE_PPSW = 3; // P.P. S/W FLASH(수동 점멸)
constants.LC_FLASH_CAUSE_CONFLICT = 4; // CONFLICT FLASH(모순 점멸)
constants.LC_FLASH_CAUSE_DBERR = 5; // DB ERROR FLASH(DB 에러 점멸)
constants.LC_FLASH_CAUSE_LIGHTOFF = 6; // 소등(진입/해제) 점멸

// EM_OP_KIND_TARGET
// 잘못건드리면 큰일나니 웬만하면 건드리지 말자 LeeGeon
constants.OPR_MODE_CENTER = 0x80;
constants.OPR_MODE_LOCAL = 0x40;
constants.SCS_OP_DISCONNECT = 0x01; // 연결종료
constants.SCS_OP_SCS_MON_REQ = 0x02; // 그룹/교차로 상태정보 요청
constants.SCS_OP_SCS_MON_RES = 0x03; // 그룹/교차로 상태정보 응답
constants.SCS_OP_SCS_DBUPDATE_REQ = 0x04; // DB Update 요청
constants.SCS_OP_SCS_DBUPDATE_RES = 0x05; // DB Update 응답
constants.SCS_OP_SCS_PRESET_REQ = 0x06; // 프로그램 재가동 요청
constants.SCS_OP_SCS_PRESET_RES = 0x07; // 프로그램 재가동 응답
constants.SCS_OP_SCS_FWUPGRADE_REQ = 0x56; // Firmware Upgrade 지시
constants.SCS_OP_SCS_FWUPGRADE_RES = 0x57; // Firmware Upgrade 응답
constants.SCS_OP_SCS_TIME_DN_REQ = 0x40; // 시각정보 다운로드 요청
constants.SCS_OP_SCS_TIME_DN_RES = 0x41; // 시각정보 다운로드 응답
constants.SCS_OP_SCS_TIME_UP_REQ = 0x42; // 시각정보 업로드 요청
constants.SCS_OP_SCS_TIME_UP_RES = 0x43; // 시각정보 업로드 응답
constants.SCS_OP_SCS_TFDTINFO_DN_REQ = 0xC4; // 검지기구성 다운로드 요청
constants.SCS_OP_SCS_TFDTINFO_DN_RES = 0xC5; // 검지기구성 다운로드 응답
constants.SCS_OP_SCS_TFDTINFO_UP_REQ = 0xC6; // 검지기구성 업로드 요청
constants.SCS_OP_SCS_TFDTINFO_UP_RES = 0xC7; // 검지기구성 업로드 응답
constants.SCS_OP_SCS_TFDTEXINFO_DN_REQ = 0xCA; // 검지기구성(확장) 다운로드 요청
constants.SCS_OP_SCS_TFDTEXINFO_DN_RES = 0xCB; // 검지기구성(확장) 다운로드 응답
constants.SCS_OP_SCS_TFDTEXINFO_UP_REQ = 0xCC; // 검지기구성(확장) 업로드 요청
constants.SCS_OP_SCS_TFDTEXINFO_UP_RES = 0xCD; // 검지기구성(확장) 업로드 응답
constants.SCS_OP_SCS_STARTCODE_UP_REQ = 0xA2; // 신호운영정보 업로드 요청
constants.SCS_OP_SCS_STARTCODE_UP_RES = 0xA3; // 신호운영정보 업로드 응답
constants.SCS_OP_SCS_SPLAN_UP_REQ = 0xA6; // 특수일계획 업로드 요청
constants.SCS_OP_SCS_SPLAN_UP_RES = 0xA7; // 특수일계획 업로드 응답
constants.SCS_OP_SCS_WPLAN_UP_REQ = 0xAA; // 주간계획 업로드 요청
constants.SCS_OP_SCS_WPLAN_UP_RES = 0xAB; // 주간계획 업로드 응답
constants.SCS_OP_SCS_DPLAN_UP_REQ = 0xB2; // 일계획 업로드 요청
constants.SCS_OP_SCS_DPLAN_UP_RES = 0xB3; // 일계획 업로드 응답
constants.SCS_OP_SCS_RPLAN_UP_REQ = 0xB6; // 예약계획 업로드 요청
constants.SCS_OP_SCS_RPLAN_UP_RES = 0xB7; // 예약계획 업로드 응답
constants.SCS_OP_SCS_SMAP_UP_REQ = 0xBE; // 시그널맵 업로드 요청
constants.SCS_OP_SCS_SMAP_UP_RES = 0xBB; // 시그널맵 업로드 응답
constants.SCS_OP_SCS_FMAP_UP_REQ = 0xC2; // 플래시맵 업로드 요청
constants.SCS_OP_SCS_FMAP_UP_RES = 0xC3; // 플래시맵 업로드 응답
constants.SCS_OP_SCS_DIR_UP_REQ = 0xD2; // 방향별출력맵 업로드 요청
constants.SCS_OP_SCS_DIR_UP_RES = 0xD3; // 방향별출력맵 업로드 응답
constants.SCS_OP_SCS_CFMAP_UP_REQ = 0xD6; // 모순맵 업로드 요청
constants.SCS_OP_SCS_CFMAP_UP_RES = 0xD7; // 모순맵 업로드 응답
constants.SCS_OP_SCS_DEVICE_INFO_UP_REQ = 0xD8; // 디바이스정보 업로드 요청
constants.SCS_OP_SCS_DEVICE_INFO_UP_RES = 0xD9; // 디바이스정보 업로드 응답
constants.SCS_OP_SCS_NET_STATE_UP_REQ = 0xDA; // 네트워크정보 업로드/다운로드 요청
constants.SCS_OP_SCS_NET_STATE_UP_RES = 0xDB; // 네트워크정보 업로드/다운로드 응답
constants.SCS_OP_SCS_UPS_UP_REQ = 0xDC; // UPS정보 요청
constants.SCS_OP_SCS_UPS_UP_RES = 0xDD; // UPS정보 응답
constants.SCS_OP_SCS_UPS_SUB_STATUS = 0x30;
constants.SCS_OP_SCS_UPS_SUB_CONTROL = 0x31;
constants.SCS_OP_SCS_UPS_SUB_VENDOR = 0x32;
constants.SCS_OP_SCS_STARTCODE_DN_REQ = 0xA0; // 신호운영정보 다운로드 요청
constants.SCS_OP_SCS_STARTCODE_DN_RES = 0xA1; // 신호운영정보 다운로드 응답
constants.SCS_OP_SCS_SPLAN_DN_REQ = 0xA4; // 특수일계획 다운로드 요청
constants.SCS_OP_SCS_SPLAN_DN_RES = 0xA5; // 특수일계획 다운로드 응답
constants.SCS_OP_SCS_WPLAN_DN_REQ = 0xA8; // 주간계획 다운로드 요청
constants.SCS_OP_SCS_WPLAN_DN_RES = 0xA9; // 주간계획 다운로드 응답
constants.SCS_OP_SCS_DPLAN_DN_REQ = 0xB0; // 일계획 다운로드 요청
constants.SCS_OP_SCS_DPLAN_DN_RES = 0xB1; // 일계획 다운로드 응답
constants.SCS_OP_SCS_RPLAN_DN_REQ = 0xB4; // 예약계획 다운로드 요청
constants.SCS_OP_SCS_RPLAN_DN_RES = 0xB5; // 예약계획 다운로드 응답
constants.SCS_OP_SCS_SMAP_DN_REQ = 0xBC; // 시그널맵 다운로드 요청
constants.SCS_OP_SCS_SMAP_DN_RES = 0xB9; // 시그널맵 다운로드 응답
constants.SCS_OP_SCS_FMAP_DN_REQ = 0xC0; // 플래시맵 다운로드 요청
constants.SCS_OP_SCS_FMAP_DN_RES = 0xC1; // 플래시맵 다운로드 응답
constants.SCS_OP_SCS_DIR_DN_REQ = 0xD0; // 방향별출력맵 다운로드 요청
constants.SCS_OP_SCS_DIR_DN_RES = 0xD1; // 방향별출력맵 다운로드 응답
constants.SCS_OP_SCS_CFMAP_DN_REQ = 0xD4; // 모순맵 다운로드 요청
constants.SCS_OP_SCS_CFMAP_DN_RES = 0xD5; // 모순맵 다운로드 응답
constants.SCS_OP_SCS_VIP_CTRL2_REQ = 0xEE; // 긴급차량우선제어(스마트) 요청
constants.SCS_OP_SCS_VIP_CTRL2_RES = 0xEF; // 긴급차량우선제어(스마트) 응답
constants.SCS_OP_SCS_STDPROTOCAL_REQ = 0xCE; // 범용프로토콜 요청
constants.SCS_OP_SCS_STDPROTOCAL_RES = 0xCF; // 범용프로토콜 응답
constants.SCS_OP_SCS_SCOMMAND_REQ = 0x50; // 특수제어 요청
constants.SCS_OP_SCS_SCOMMAND_RES = 0x51; // 특수제어 응답
constants.SCS_OP_SCS_GROUPOPR_REQ = 0xE6; // 그룹운영 요청
constants.SCS_OP_SCS_GROUPOPR_RES = 0xE7; // 그룹운영 응답
constants.SCS_OP_SCS_LCOPR_REQ = 0xE8; // 교차로운영 요청
constants.SCS_OP_SCS_LCOPR_RES = 0xE9; // 교차로운영(Center) 응답
constants.SCS_OP_SCS_TODTRC_REQ = 0xEA; // 그룹/교차로(TOD/TRC) 요청
constants.SCS_OP_SCS_TODTRC_RES = 0xEB; // 그룹/교차로(TOD/TRC) 응답
constants.SCS_OP_SCS_MANCTRL_REQ = 0xEC; // MAN제어 요청
constants.SCS_OP_SCS_MANCTRL_RES = 0xED; // MAN제어 응답
constants.SCS_OP_SCS_OPTION_BOARD_DN_REQ = 0x52; // 옵션보드 다운로드 요청
constants.SCS_OP_SCS_OPTION_BOARD_DN_RES = 0x53; // 옵션보드 다운로드 응답
constants.SCS_OP_SCS_OPTION_BOARD_UP_REQ = 0x54; // 옵션보드 업로드 요청
constants.SCS_OP_SCS_OPTION_BOARD_UP_RES = 0x55; // 옵션보드 업로드 응답
constants.SCS_OP_SCS_LC_CTRL_REQ = 0x10; // 교차로제어 요청
constants.SCS_OP_SCS_LC_CTRL_RES = 0x11; // 교차로제어 응답
constants.SCS_OP_SCS_COMMON_PROTOCOL_REQ = 0xCE; // 범용프로토콜 업로드/다운로드 요청
constants.SCS_OP_SCS_COMMON_PROTOCOL_RES = 0xCF; // 범용프로토콜 업로드/다운로드 응답
constants.SCS_OP_SCS_EXTEND_PROTOCOL_UP_REQ = 0x64; // 확장프로토콜 업로드요청
constants.SCS_OP_SCS_EXTEND_PROTOCOL_UP_RES = 0x65; // 확장프로토콜 업로드응답
constants.SCS_OP_SCS_EXTEND_PROTOCOL_DN_REQ = 0x62; // 확장프로토콜 다운로드 요청
constants.SCS_OP_SCS_EXTEND_PROTOCOL_DN_RES = 0x63; // 확장프로토콜 다운로드 응답
constants.SCS_OP_SCS_ACTUATE_VARIABLE_UP_REQ = 0xDA; // 확장프로토콜 다운로드 요청
constants.SCS_OP_SCS_ACTUATE_VARIABLE_UP_RES = 0xDB; // 확장프로토콜 다운로드 응답
constants.SCS_OP_SCS_ACTUATE_VARIABLE_DN_REQ = 0xDC; // 확장프로토콜 다운로드 요청
constants.SCS_OP_SCS_ACTUATE_VARIABLE_DN_RES = 0xDD; // 확장프로토콜 다운로드 응답
// Event Code(eventType)
constants.SCS_EVNT_DB_UPDATE = 13;  // 정보갱신
constants.SCS_EVNT_DB_UPDN = 14;  // DB 업다운로드
constants.SCS_EVNT_LC_MODE_ALT = 32;  // 교차로 모드변경
constants.SCS_EVNT_LC_STAT_ALT = 33;  // 교차로 상태변경
constants.SCS_EVNT_LC_SP_CMD = 41;  // 교차로 특수제어
constants.SCS_EVNT_GR_MODE_ALT = 64;  // 그룹 모드변경
constants.SCS_EVNT_GR_SCHD_ALT = 65;  // 그룹 계획변경
constants.SCS_EVNT_GR_MAN_CTL = 67;  // 그룹 수동제어
constants.SCS_EVNT_GR_MODE_CTL = 68;  // 그룹 모드제어
constants.SCS_EVNT_GR_SP_CMD = 69;  // 그룹 특수제어
constants.SCS_EVNT_TF_STAT_ALT = 96;  // 검지기 상태변경
constants.SCS_EVNT_USER_LOGINOUT = 160; // 운영자 로그인/아웃
constants.SCS_EVNT_SCS_DBUPDATE_REQ = 0x01; //DB Update
constants.SCS_EVNT_SCS_PRESET_REQ = 0x02; //프로그램 재가동
constants.SCS_EVNT_SCS_TIME_DN_REQ = 0x40;	//시간정보 다운로드요청
constants.SCS_EVNT_SCS_TIME_UP_REQ = 0x42;	//시간정보업로드요청
constants.SCS_EVNT_SCS_STARTCODE_DN_REQ = 0xA0;	//시작정보 다운로드요청
constants.SCS_EVNT_SCS_STARTCODE_UP_REQ = 0xA2;	//시작정보 업로드요청
constants.SCS_EVNT_SCS_SPLAN_DN_REQ = 0xA4;	//특수일계획 다운로드요청
constants.SCS_EVNT_SCS_SPLAN_UP_REQ = 0xA6;	//특수일계획 업로드요청
constants.SCS_EVNT_SCS_WPLAN_DN_REQ = 0xA8;	//주간계획 다운로드요청
constants.SCS_EVNT_SCS_WPLAN_UP_REQ = 0xAA;	//주간계획 업로드요청
constants.SCS_EVNT_SCS_DPLAN_DN_REQ = 0xB0;	//일계획 다운로드요청
constants.SCS_EVNT_SCS_DPLAN_UP_REQ = 0xB2;	//일계획 업로드요청
constants.SCS_EVNT_SCS_RPLAN_DN_REQ = 0xB4;	//예약계획 다운로드요청
constants.SCS_EVNT_SCS_RPLAN_UP_REQ = 0xB6;	//예약계획 업로드요청
constants.SCS_EVNT_SCS_SMAP_DN_REQ = 0xBC;	//시그널맵 다운로드요청
constants.SCS_EVNT_SCS_SMAP_UP_REQ = 0xBE;	//시그널맵업로드요청
constants.SCS_EVNT_SCS_FMAP_DN_REQ = 0xC0;	//플래쉬맵 다운로드요청
constants.SCS_EVNT_SCS_FMAP_UP_REQ = 0xC2;	//플래쉬맵 업로드요청
constants.SCS_EVNT_SCS_TFDTINFO_DN_REQ = 0xC4;	//검지기정보 다운로드요청
constants.SCS_EVNT_SCS_TFDTINFO_UP_REQ = 0xC6;	//검지기정보 업로드요청
constants.SCS_EVNT_SCS_STARTCODE_SAVE = 0xDE; // 신호운영정보 저장
constants.SCS_EVNT_SCS_SPLAN_SAVE = 0xDF; // 특수일계획 저장
constants.SCS_EVNT_SCS_WPLAN_SAVE = 0xE0; // 주간계획 저장
constants.SCS_EVNT_SCS_DPLAN_SAVE = 0xE1; // 일계획 저장
constants.SCS_EVNT_SCS_RPLAN_SAVE = 0xE2; // 예약계획 저장
constants.SCS_EVNT_SCS_SMAP_SAVE = 0xE3; // 시그널맵 저장
constants.SCS_EVNT_SCS_FMAP_SAVE = 0xE4; // 플래시맵 저장
constants.SCS_EVNT_SCS_TFDTEXINFO_SAVE = 0xE5; // 검지기구성 저장
constants.SCS_EVNT_SCS_DIR_SAVE = 0xE6; // 방향별출력맵 저장
constants.SCS_EVNT_SCS_CFMAP_SAVE = 0xE7; // 모순맵 저장

constants.SCS_EVNT_SCS_LC_CMD_MCU_RESET = 0x01; //MCU리셋
constants.SCS_EVNT_SCS_LC_CMD_SCU_RESET = 0x02; //SCU리셋
constants.SCS_EVNT_SCS_LC_CMD_CONFLICT_RESET = 0x04; //모순해제
constants.SCS_EVNT_SCS_LC_CMD_MAN = 0x08; //수동조작
constants.SCS_EVNT_SCS_LC_CMD_CONFLICT = 0x10; //모순검지여부
constants.SCS_EVNT_SCS_LC_CMD_FRENZY = 0x20; //조광제어
constants.SCS_EVNT_SCS_LC_CMD_FLASH = 0x40; //점멸
constants.SCS_EVNT_SCS_LC_CMD_LIGHTOFF = 0x80; //소등
constants.SCS_EVNT_SCS_LC_CMD_TIMEDIFF = 0xA1; //시차제어
constants.SCS_EVNT_SCS_LC_CMD_ACT = 0xA2; //감응제어
constants.SCS_EVNT_SCS_LC_CMD_PHASE_HOLD = 0xA3; //현시유지
constants.SCS_EVNT_SCS_LC_CMD_PHASE_OMMIT = 0xA4; //현시생략
constants.SCS_EVNT_SCS_LC_CMD_LOCAL_MODE = 0xA5; //로컬모드제어
constants.SCS_EVNT_SCS_LC_CMD_CENTER_MODE = 0xA6; //센터모드제어
constants.SCS_EVNT_SCS_LC_CMD_SPILBACK = 0xA7; //앞막힘제어
constants.SCS_EVNT_SCS_LC_CMD_TOD = 0xA8; //TOD모드적용
constants.SCS_EVNT_SCS_LC_CMD_TRC = 0xA9; //TRC모드적용
constants.SCS_EVNT_SCS_LC_CMD_PUSH_BTN_ENABLE = 0xAA; //보행자 PUSH BUTTON 활성화/비활성화
constants.SCS_EVNT_SCS_LC_CMD_PPC_BOARD = 0xAB; //Preemption & Priority Controller Activation
constants.SCS_EVNT_SCS_LC_CMD_FW_UPGRADE = 0xAC; //Preemption & Priority Controller Activation
constants.SCS_EVNT_SCS_LC_CMD_FORCE_OFF = 0xAD; //Phase Force-off
constants.SCS_EVNT_SCS_LC_CMD_JUMP = 0xAE; //Phase Jump

constants.SCS_EVNT_SCS_GROUPOPR_LOCAL = 0x00;	//로컬모드
constants.SCS_EVNT_SCS_GROUPOPR_CENTER = 0x01;	//센터모드

constants.SCS_EVNT_SCS_GROUPMOD_TOD = 0x00; //그룹모드제어
constants.SCS_EVNT_SCS_GROUPMOD_TRC = 0x01;

constants.SCS_EVNT_SCS_GROUPCTL_MAN = 0x00; //그룹수동제어

constants.SCS_EVNT_USER_LOGIN = 0x00; //운영자 로그인
constants.SCS_EVNT_USER_LOGOUT = 0x01; //운영자 로그아웃

// 권한등급
constants.AUTHORITY_MAIN_ADMIN = 1; // 메인관리자
constants.AUTHORITY_OPRERATOR = 2; // 운영자
constants.AUTHORITY_ADMIN = 3; // 관리자
constants.AUTHORITY_POLICE = 4;    // 경찰

// 교차로유형
constants.LCTYPE_MI = 0; // MI
constants.LCTYPE_CI = 1; // CI
constants.LCTYPE_SCI = 2; // SCI
constants.LCTYPE_RAMP = 3; // RAMP
constants.LCTYPE_VIRTUAL = 4; // 연등

// 링
constants.RING_A = 1;
constants.RING_B = 2;

constants.LC_OPRSTATUS_COMM_FAIL = 0;  // 통신이상
constants.LC_OPRSTATUS_CENTER_MODE = 1;  // 센터-무감응
constants.LC_OPRSTATUS_LOCAL_MODE = 2;  // 로컬-무감응
constants.LC_OPRSTATUS_FAIL = 3;  // 실패
constants.LC_OPRSTATUS_TRANSE = 4;  // 전이
constants.LC_OPRSTATUS_FLASH = 5;  // 점멸
constants.LC_OPRSTATUS_LIGHT_OFF = 6;  // 소등
constants.LC_OPRSTATUS_MAN_OPR = 7;  // 수동진행
constants.LC_OPRSTATUS_MAN_FLASH = 8;  // 수동점멸
constants.LC_OPRSTATUS_MAN_LIGHT_OFF = 9;  // 수동소등
constants.LC_OPRSTATUS_PAHSE_HOLD = 10; // 현시유지
constants.LC_OPRSTATUS_SCU_MODE = 11; // SCU모드
constants.LC_OPRSTATUS_PPC_MODE = 12; // PPC모드
constants.LC_OPRSTATUS_ACT_MODE = 13; // 감응제어, 안쓰이는듯...
constants.LC_OPRSTATUS_FORCE_TOD = 14; // 강제TOD
constants.LC_OPRSTATUS_CENTER_ACT_MODE = 15; // 센터-감응
constants.LC_OPRSTATUS_LOCAL_ACT_MODE = 16; // 로컬-감응
constants.LC_OPRSTATUS_NOT_USED = 17; // 사용안함

// 소등상태
constants.LIGHT_OFF_0 = 0; // 정상
constants.LIGHT_OFF_1 = 1; // 소등

// 점멸상태
constants.FLASH_0 = 0; // 정상
constants.FLASH_1 = 1; // 점멸

// P.수동진행SW
constants.POLICE_ING_0 = 0; // OFF
constants.POLICE_ING_1 = 1; // ON

// P.점멸SW
constants.POLICE_FLASH_0 = 0; // OFF
constants.POLICE_FLASH_1 = 1; // ON

// P.소등SW
constants.POLICE_OFF_0 = 0; // OFF
constants.POLICE_OFF_1 = 1; // ON

// 모순상태
constants.CONFLICT_0 = 0; // 정상
constants.CONFLICT_1 = 1; // 모순

// 함체문 열림
constants.DOOR_OPEN_0 = 0; // 닫힘
constants.DOOR_OPEN_1 = 1; // 열림

// 모순감지불가
constants.CONFLICT_ENABLE_0 = 0; // 불가
constants.CONFLICT_ENABLE_1 = 1; // 정상

// End of LeeGeon

// protocol
constants.protocol_header_size = 5;
constants.protocol_opcode_size = 1;
constants.protocol_datalength_size = 4;
constants.protocol_lrc_size = 1;

// Machine ID 
constants.MACHINE_ID_TERM = 1; // 신호운영단말
constants.MACHINE_ID_HOST = 2; // HOST
constants.MACHINE_ID_RC = 3; // RC
constants.MACHINE_ID_FEP = 4; // FEP
constants.MACHINE_ID_LC = 5; // 신호제어기

// ctlKind (시스템 종류)
constants.KIND_ALL = 0; // 전체
constants.KIND_LC = 1; // 교차로
constants.KIND_GROUP = 2; // 그룹
constants.KIND_SYSTEM = 3; // 시스템
constants.KIND_AI = 4; // AI

// Command
constants.SCS_OP_DISCONNECT = 0x01; // 연결종료
constants.SCS_OP_SCS_MON_REQ = 0x02; // 그룹/교차로 상태정보요청
constants.SCS_OP_SCS_MON_RES = 0x03; // 그룹/교차로 상태정보응답

constants.SCS_OP_PPC_START_REQ = 0x12; // 우선신호제어요청
constants.SCS_OP_PPC_START_RES = 0x13; // 우선신호제어응답
constants.SCS_OP_PPC_STOP_REQ = 0x14; // 우선신호제어중지요청
constants.SCS_OP_PPC_STOP_RES = 0x15; // 우선신호제어중지응답
constants.SCS_OP_PPC_MANUAL_REQ = 0x16; // 우선신호수동제어요청
constants.SCS_OP_PPC_MANUAL_RES = 0x17; // 우선신호수동제어응답

constants.SCS_TEST_REQ = 0xA6;
constants.SCS_TEST_RES = 0xA7;

constants.SCS_OP_DESC = {
    0x12: "우선신호제어요청",
    0x13: "우선신호제어응답",
    0x14: "우선신호제어중지요청",
    0x15: "우선신호제어중지응답",
    0x16: "우선신호수동제어요청",
    0x17: "우선신호수동제어응답"
}

constants.SCS_OP_STRING = {
    0x01: "0x01",
    0x02: "0x02",
    0x03: "0x03",
    0x12: "0x12",
    0x13: "0x13",
    0x14: "0x14",
    0x15: "0x15",
    0x16: "0x16",
    0x17: "0x17"
}

//AI
constants.AI_COMMEAND = 0x08;                       //  AI COMMEAND
constants.AI_VISION_UPLOAD_REQ = 0x1c;              //  시각정보 업로드 요청
constants.AI_VISION_UPLOAD_RES = 0x1D;              //  시각정보 업로드 응답
constants.AI_VISION_DOWNLOAD_REQ = 0x1a;            //  시각정보 다운로드 요청
constants.AI_VISION_DOWNLOAD_RES = 0x1b;            //  시각정보 다운로드 응답
constants.AI_AREA_CONFIG_UPLOAD_REQ = 0x20;         //  영역구성 업로드 요청
constants.AI_AREA_CONFIG_UPLOAD_RES = 0x21;         //  영역구성 업로드 응답
constants.AI_AREA_CONFIG_DOWNLOAD_REQ = 0x1e;       //  영역구성 다운로드 요청
constants.AI_AREA_CONFIG_DOWNLOAD_RES = 0x1f;       //  영역구성 다운로드 응답

module.exports = Object.freeze(constants); // freeze prevents changes by users
