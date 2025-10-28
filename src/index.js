// const express = require('express')  // -> CommonJS

// dotenv: .env 파일로부터 환경 변수를 읽어 들이고 
// 이를 process.env. 객체를 통해 접근할 수 있도록 하는 역할
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { handleUserSignUp, handleListUserMissionsInProgress, handleCompleteUserMission } from "./controllers/user.controller.js"; 
import  { addMission, assignUserMission} from "./controllers/mission.controller.js"; 
import { addReview } from "./controllers/review.controller.js"; 
import { handleListStoreReviews, handleListStoreMissions } from "./controllers/store.controller.js"

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/v1/stores/:storeId/reviews", addReview);
app.post("/api/v1/stores/:storeId/missions", addMission);
app.post("/api/v1/missions/:missionId/users/:userId", assignUserMission);

app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);
app.get("/api/v1/stores/:storeId/missions", handleListStoreMissions)
app.get("/api/v1/users/:userId/missions/inprogress", handleListUserMissionsInProgress)

app.patch("/api/v1/users/:userId/missions/:missionId/complete", handleCompleteUserMission)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

