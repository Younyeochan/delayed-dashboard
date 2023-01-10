var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
// var logger = require( 'morgan' )

var cors = require("cors");

/**
 * DB SETUP
 */
var oracledb = require("oracledb");

oracledb.outFormat = oracledb.OBJECT; // ColumnName: Value 형식으로 변경
oracledb.fetchAsString = [oracledb.CLOB]; // CLOB를 스트링으로 가져오도록 설정
oracledb.fetchAsBuffer = [oracledb.BLOB]; // BLOB를 버퍼로 가져오도록 설정
oracledb.fetchArraySize = 100;
oracledb.poolTimeout = 60; // 타임아웃 5초
oracledb.queueTimeout = 5 * 1000; // 타임아웃 5초
oracledb.autoCommit = false;
/**
 * DEV MODE
 */

/**
 * ORACLE SETTING
 * */
process.env["PATH"] = path.join(__dirname, "/instantclient") + ";" + process.env["PATH"];

/**
 * DEV-MODE ORACLE
 */
// var devMode = require( "./common_modules/dev-mode" )
// devMode.devModeInitOracleClient()
oracledb.initOracleClient({libDir: "C:\\oracleclient\\instantclient_12_2"});
/**
 * DEV MODE
 */

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// app.use( logger( 'dev' ) )
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/**
 * ROUTER
 */
const ROUTER_INDEX = require("./routes/index");
app.use("/map", ROUTER_INDEX.mapRouter);
app.use("/dashboard", ROUTER_INDEX.dashboardRouter);

// app.use("/test", ROUTER_INDEX.testRescsRouter);

/**
 * ROUTER 다음에 위치 LOGGER Winston
 */
const logger = require("./logger/winstonLogger");
logger.info("========== Backend Started ==========");

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
