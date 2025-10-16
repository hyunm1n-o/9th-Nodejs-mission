import { responseFromUser } from "../dtos/user.dto.js";
import bcrypt from "bcrypt";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  getStore,
  addReview,
  addMission,
  getMission,
  addUserMission
} from "../repositories/user.repository.js";

// 회원가입
export const userSignUp = async (data) => {
  // 비밀번호 해싱
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);

  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
    password: hashedPassword,
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

// 가게에 리뷰 추가
export const createReview = async (data) => {
 // 1. 유저 존재 검증
const user = await getUser(data.userId);
if (!user) {
 throw new Error("존재하지 않는 유저입니다.");
}

 // 2. 가게 존재 검증
 const store = await getStore(data.storeId);
if (!store) {
 throw new Error("존재하지 않는 가게입니다.");
}

  const reviewId = await addReview({
    userId: data.userId,
    storeId: data.storeId,
    body: data.body,
    score: data.score
  });

  return {reviewId, message: "리뷰 작성 완료"};
};

// 가게에 미션 추가
export const createMission = async (data) => {

 // 1. 가게 존재 검증
 const store = await getStore(data.storeId);
if (!store) {
 throw new Error("존재하지 않는 가게입니다.");
}

  const missionId = await addMission({
    storeId: data.storeId,
    reward: data.reward,
    deadline: data.deadline,
    mission_spec: data.mission_spec
  });

  return {missionId, message: "미션 추가 완료"};
};

// 사용자 미션 연결
export const createUserMission = async (data) => {
 // 1. 유저 존재 검증
const user = await getUser(data.userId);
if (!user) {
 throw new Error("존재하지 않는 유저입니다.");
}

 // 2. 미션 존재 검증
 const mission = await getMission(data.missionId);
if (!mission) {
 throw new Error("존재하지 않는 미션입니다.");
}
//도전하려는 미션이 이미 도전 중이지는 않은지 검증이 필요합니다.??

  const userMissionId = await addUserMission({
    userId: data.userId,
    missionId: data.missionId,
    status: data.status
  });

  return {userMissionId, message: "사용자 미션 연결 완료"};
};