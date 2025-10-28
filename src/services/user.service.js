import { responseFromUser } from "../dtos/user.dto.js";
import { getUserMissionsInProgress, updateUserMissionToComplete } from "../repositories/user.repository.js";


import bcrypt from "bcrypt";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
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

export const listUserMissionsInProgress = async (userId) => {
  const missions = await getUserMissionsInProgress(userId);
  return missions; 
};

export const completeUserMission = async (userId, missionId) => {
  const result = await updateUserMissionToComplete(userId, missionId);
  if (result === 0) {
    throw new Error("진행 중인 미션이 없거나 이미 완료된 미션입니다.");
  }
  return { message: "미션 완료 처리 완료" };
};
