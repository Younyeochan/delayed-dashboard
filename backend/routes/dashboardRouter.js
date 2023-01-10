const express = require("express");
const router = express.Router();

const Constants = require("../modules/Constants");

// 1. 평균 지체 시간 (현재, 금일, 1주전, 2주전)
let dsApi = require("../api/dashboard/a1_getDelaySummary");
router.get("/a1", function (req, res, next) {
    res.set(Constants.ROUTER_HEADER);

    const dt = req.query.dt.slice(0, 12);
    console.log("요청 파라미터:", dt);

    dsApi.getDelaySummary(dt).then((ret) => {
        res.send(JSON.stringify(ret));
    });
});

// 2. 전체교차로 LOS 추이 비교
let ltApi = require("../api/dashboard/a2_getLosTrend");
router.get("/a2", function (req, res, next) {
    res.set(Constants.ROUTER_HEADER);

    const dt = req.query.dt;
    console.log("요청 파라미터:", dt);

    ltApi.getLosTrend(dt).then((ret) => {
        res.send(JSON.stringify(ret));
    });
});

// 3. 교차로 지체시간 순위 TOP 10
let dtApi = require("../api/dashboard/a3_getDelayTop");
router.get("/a3", function (req, res, next) {
    res.set(Constants.ROUTER_HEADER);

    const dt = req.query.dt.slice(0, 12);
    console.log("요청 파라미터:", dt);

    dtApi.getDelayTop(dt).then((ret) => {
        res.send(JSON.stringify(ret));
    });
});

// 4. 교차로 개수 (지도)
let daApi = require("../api/dashboard/a4_getJcCount");
router.get("/a4_1", function (req, res, next) {
    res.set(Constants.ROUTER_HEADER);

    const dt = req.query.dt;
    console.log("요청 파라미터:", dt);

    daApi.getJcCount(dt).then((ret) => {
        res.send(JSON.stringify(ret));
    });
});

// 4. 지체시간 (지도)
let dlApi = require("../api/dashboard/a4_getDelayTime");
router.get("/a4_2", function (req, res, next) {
    res.set(Constants.ROUTER_HEADER);

    const dt = req.query.dt.slice(0, 12);
    console.log("요청 파라미터:", dt);

    dlApi.getDelayTime(dt).then((ret) => {
        res.send(JSON.stringify(ret));
    });
});

// 5. F등급 이상 교차로들의 평균 지체 추이
let ofApi = require("../api/dashboard/a5_getDelayTrendOverF");
router.get("/a5", function (req, res, next) {
    res.set(Constants.ROUTER_HEADER);

    const dt = req.query.dt;
    const cnt = req.query.cnt;
    console.log("요청 파라미터:", dt, cnt);

    ofApi.getDelayTrendOverF(dt, cnt).then((ret) => {
        res.send(JSON.stringify(ret));
    });
});

// 6. LOS 등급별 비율현황
let gpApi = require("../api/dashboard/a6_getLosGradePercent");
router.get("/a6", function (req, res, next) {
    res.set(Constants.ROUTER_HEADER);

    const dt = req.query.dt.slice(0, 8);
    console.log("요청 파라미터:", dt);

    gpApi.getLosGradePercent(dt).then((ret) => {
        res.send(JSON.stringify(ret));
    });
});

// 7. LOS 등급별 교차로 개수
let gcApi = require("../api/dashboard/a7_getLosGradeCount");
router.get("/a7", function (req, res, next) {
    res.set(Constants.ROUTER_HEADER);

    const dt = req.query.dt.slice(0, 12);
    const cnt = req.query.cnt;
    console.log("요청 파라미터:", dt, cnt);

    gcApi.getLosGradeCount(dt, cnt).then((ret) => {
        res.send(JSON.stringify(ret));
    });
});

module.exports = router;
