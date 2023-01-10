/**
 * @module logger
 * @desc nodejs의 로깅 라이브러리 중 가장 유명한 로거
 * @desc 업데이트를 생각보다 자주 하는 라이브러리이기 때문에 인터넷에 떠도는 블로그 글을 참조하면 안된다.
 * @desc 반드시 공식홈페이지의 문서와 예제를 참조할 것! https://github.com/winstonjs/winston
 * @desc app.js에선 반드시 router 다음에 위치해야 한다!!!
 */

// 1. winston 라이브러리 임포트
const { createLogger, format, transports } = require( 'winston' )

// 2. nodejs 파일시스템 라이브러리 가져오기(app.js에 express 서버 기본으로 var로 import 되어 있기 때문에 var 사용)
var fs = require( 'fs' )
var path = require( 'path' )

// 3. 파일 디렉토리 위치 저장(현재 위치한 파일의 최상위(backend)폴더에서 한 단계 상위 폴더)
const logDir = '../log'
const errorLogDir = '../log/error'

// 4. AI_STUDY 폴더에 log라는 파일명이 없을 경우 log파일명 생성, 있을 경우 생성 X
if ( !fs.existsSync( logDir ) ) {
    fs.mkdirSync( logDir )
}

// 5. log 폴더에 쌓아둘 요일별 파일명 생성
let year = new Date().getFullYear()
let month = new Date().getMonth()
let date = new Date().getDate()

let filenameByDate = year + '' + month + '' + date

// 6. 위에서 지정한 로그가 쌓일 폴더안에 파일 생성
const filename = path.join( logDir, `${ filenameByDate }.log` )
const errorFilename = path.join( errorLogDir, `${ filenameByDate }_error.log` )
// 7. 로거 세팅(추후 필요한 추가 옵션은 공식홈페이지를 통해 확인 후 추가하면 됨) 
const logger = createLogger( {

    // 7-1. 개발환경 및 로그 옵션
    level: process.env === 'development' ? 'debug' : 'info',

    // 7-2. 로그 포맷 지정(포맷미지정시 default - json() 타입)
    format: format.combine(

        // 7-2-1. 로그 옵션별로 색 지정(기본적으로 라이브러리에 세팅되어져 있던 색상 사용)
        format.colorize(),

        // 7-2-2. 로그 출력 내용 포멧중 날짜 포맷
        format.timestamp( {
            format: 'YYYY-MM-DD HH:mm:ss'
        } ),

        // 7-2-3. 로그 출력 형식
        // format.json(), // json형태로 출력 가능하지만 프론트로 따로 보낼게 아니라면 가독성이 매우 떨어짐.
        format.printf( info =>
            `${ info.timestamp } ${ info.level }: ${ info.message }`
        )
    ),

    // 출력 옵션 설정 : 파일 출력 로거
    transports: [

        // 전체 로그 출력
        new transports.Console( {
            level: 'info', // info인 경우 winston의 7단계중 총 3단계가 같이 기록된다(info < warn < error)
            format: format.combine(
                format.colorize(),
                format.printf( info => {
                    info.timestamp + info.level + ':' + info.message
                }
                )
            )
        } ),

        // 에러용
        new transports.Console( {
            level: 'error',
            format: format.combine(
                format.colorize(),
                format.printf( error => {
                    error.timestamp + error.level + ':' + error.message
                }
                )
            )
        } ),

        // 지정한 출력 옵션 값 파일로 전송, 전체 로그 출력
        new transports.File( {
            filename,
            level: 'info'
        } ),

        // 에러용만 따로 출력
        new transports.File( {
            filename: errorFilename,
            level: 'error'
        } )
    ]
} )

module.exports = logger