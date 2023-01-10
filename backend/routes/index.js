/**
 * @desc 라우터 최상위 모듈
 * @module ~/router/index
 * @importedModule mapRouter : 지도위에 뿌려지는 데이터
 */

var mapRouter = require("./mapRouter");
var dashboardRouter = require("./dashboardRouter");

const ROUTER_INDEX = {
    mapRouter,
    dashboardRouter,
};

module.exports = ROUTER_INDEX;
