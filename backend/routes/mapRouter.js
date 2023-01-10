var express = require("express");
var router = express.Router();

const Constants = require("../modules/Constants");

/**
 * @module ~/router/mapRouter
 * @basePath ~/map
 * @path @basePath + /lc
 * @function getMapLcList()
 */
let lcApi = require("../api/map/lc");
router.get("/lc", function (req, res, next) {
    res.set(Constants.ROUTER_HEADER);

    lcApi.getMapLcList(req.query.northEastLng, req.query.northEastLat, req.query.southWestLng, req.query.southWestLat).then((ret) => {
        res.send(JSON.stringify(ret));
    });
});

/**
 * @module ~/router/mapRouter
 * @basePath ~/map
 * @path @basePath + /sa
 * @function getMapSaList()
 */
let saApi = require("../api/map/sa");
router.get("/sa", function (req, res, next) {
    res.set(Constants.ROUTER_HEADER);
    saApi.getMapSaList().then((ret) => {
        res.send(JSON.stringify(ret));
    });
});

/**
 * @module ~/router/mapRouter
 * @basePath ~/map
 * @path @basePath + /node
 * @function getMapNodeList()
 */
let nodeApi = require("../api/map/node");
router.get("/node", function (req, res, next) {
    res.set(Constants.ROUTER_HEADER);
    nodeApi.getMapNodeList(req.query.northEastLng, req.query.northEastLat, req.query.southWestLng, req.query.southWestLat).then((ret) => {
        res.send(JSON.stringify(ret));
    });
});

/**
 * @module ~/router/mapRouter
 * @basePath ~/map
 * @path @basePath + /link
 * @function getMapLinkList()
 */
let linkApi = require("../api/map/link");
router.get("/link", function (req, res, next) {
    res.set(Constants.ROUTER_HEADER);
    linkApi.getMapLinkList(req.query.northEastLng, req.query.northEastLat, req.query.southWestLng, req.query.southWestLat).then((ret) => {
        res.send(JSON.stringify(ret));
    });
});

/**
 * @module ~/router/mapRouter
 * @basePath ~/map
 * @path @basePath + /next-node
 * @function getNextNodeList()
 */
let nextNodeApi = require("../api/map/next-node");
router.get("/next-node", function (req, res, next) {
    res.set(Constants.ROUTER_HEADER);
    nextNodeApi.getNextNodeList(req.query.nodeId).then((ret) => {
        res.send(JSON.stringify(ret));
    });
});

/**
 * @module ~/router/mapRouter
 * @basePath ~/map
 * @path @basePath + /lc-traffic-light
 * @function getLcTrafficLight()
 */
let lcTrafficLightApi = require("../api/map/lc-traffic-light");
router.get("/lc-traffic-light", function (req, res, next) {
    res.set(Constants.ROUTER_HEADER);
    lcTrafficLightApi.getLcTrafficLight(req.query.lcNo).then((ret) => {
        res.send(JSON.stringify(ret));
    });
});

/**
 * @module ~/router/mapRouter
 * @basePath ~/map
 * @path @basePath + /lc-status
 * @function getMapLcStatus()
 */
let lcStatusApi = require("../api/map/lc-status");
router.get("/lc-status", function (req, res, next) {
    res.set(Constants.ROUTER_HEADER);
    lcStatusApi.getMapLcStatus().then((ret) => {
        res.send(JSON.stringify(ret));
    });
});

/**
 * @module ~/router/mapRouter
 * @basePath ~/map
 * @path @basePath + /lc-count
 * @function getMapLcCount()
 */
let lcCountApi = require("../api/map/lc-count");
router.get("/lc-count", function (req, res, next) {
    res.set(Constants.ROUTER_HEADER);
    lcCountApi.getMapLcCount().then((ret) => {
        res.send(JSON.stringify(ret));
    });
});

/**
 * @module ~router/mapRouter
 * @basePath ~/map
 * @path @basePath + /display-lc-phase
 * @function getDisplayLcPhaseInfo()
 */
let displayLcPhaseInfoApi = require("../api/map/display-lc-phase");
router.get("/display-lc-phase", function (req, res, next) {
    res.set(Constants.ROUTER_HEADER);
    displayLcPhaseInfoApi.getDisplayLcPhaseInfo(req.query.northEastLat, req.query.northEastLng, req.query.southWestLat, req.query.southWestLng).then((ret) => {
        res.send(JSON.stringify(ret));
    });
});

/**
 * @module ~router/mapRouter
 * @basePath ~/map
 * @path @basePath + /display-lc
 * @function getDisplayLcStatusInfo()
 */
let displayLcStatusInfoApi = require("../api/map/display-lc");
router.get("/display-lc", function (req, res, next) {
    res.set(Constants.ROUTER_HEADER);
    displayLcStatusInfoApi.getLcDisplayInfo(req.query.northEastLat, req.query.northEastLng, req.query.southWestLat, req.query.southWestLng).then((ret) => {
        res.send(JSON.stringify(ret));
    });
});

/**
 * @module ~router/mapRouter
 * @basePath ~/map
 * @path @basePath + /tsa-sa-all
 * @function getMapTsaSaAll()
 */
let tsaSaAllApi = require("../api/map/tsa-sa-all");
router.get("/tsa-sa-all", function (req, res, next) {
    res.set(Constants.ROUTER_HEADER);
    tsaSaAllApi.getMapTsaSaAll().then((ret) => {
        res.send(JSON.stringify(ret));
    });
});

/**
 * @module ~router/mapRouter
 * @basePath ~/map
 * @path @basePath + /tsa-sa
 * @function getMapTsaSa()
 */
let tsaSaApi = require("../api/map/tsa-sa");
router.get("/tsa-sa", function (req, res, next) {
    res.set(Constants.ROUTER_HEADER);
    tsaSaApi.getMapTsaSa(req.query.saNo).then((ret) => {
        res.send(JSON.stringify(ret));
    });
});

module.exports = router;
