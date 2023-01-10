
/**
 * @Constants
 * @desc Backend에서 사용하는 Constants 값 
 * @module ~/backend/modules/Constants
 */

const Constants = {}

// JSON Result
Constants.MESSAGE_SUCCESS = '개의 데이터가 조회되었습니다.'
Constants.MESSAGE_FAILED = '실패'

Constants.MESSAGE_FAILED_LOGIN_NO_MATCHING = '일치하는 데이터가 없습니다'
Constants.ROUTER_HEADER = `'Content-Type', 'application/json; chartset=utf8'`

module.exports = Constants