// const createError = require("http-errors"); // 에러 처리
const express = require("express");
const path = require("path"); // 파일과 디렉토리 경로 작업을 위한 유틸리티 제공
const cookieParser = require("cookie-parser"); // 요청된 쿠키를 쉽게 추출할 수 있도록 도와주는 미들웨어
const logger = require("morgan"); // nodejs 서버로 구성된 웹 환경에서 log를 관리하기 위한 별도의 툴
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const RouterIndex = require("./routes/router_index");
const app = express();

const corsOptions = {
  origin: "*",
  // origin: ["http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  // "optionsSuccessStatus": 204
  // credentials: true
};

// dotenv
dotenv.config({ path: path.join(__dirname, ".env") });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 기본 path를 /public으로 설정
app.use(logger("dev")); // 로그  (morgan이 지원하는 log포맷)
app.use(cors(corsOptions));
app.use(fileUpload());
app.use(express.json()); // expressjs에서 JSON requestBody 파싱
app.use(express.urlencoded({ extended: false })); // extended 는 중첩된 객체표현을 허용할지 말지를 정하는 것 // 내부적으로는 true : qs모듈,, false : query-string 모듈 사용
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// router
app.use("/", RouterIndex);

// database connect
// const database = require("./models/db/db_connect.js");
// const conn = database.conn();

// port설정
app.listen(process.env.PORT, () => {
  // dotenv.config().parsed.PORT
  console.log(`Server Running On ${process.env.PORT} port`);
});
