import { responseFromUser } from "../dtos/user.dto.js";
import {
  MissionNotInProgressError
} from "../errors.js";
import { 
  getUserMissionInProgress,
  updateUserMissionToComplete,
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

import bcrypt from "bcrypt";
import { prisma } from "../db.config.js";  

// 회원가입
export const userSignUp = async (data) => {
  // 비밀번호 해싱
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);

  // 1. 사용자의 이메일을 통해 기존 사용자 찾기
  const existingUser = await prisma.user.findFirst({ 
    where: { email: data.email } 
  });

  let userId;

  if (existingUser) {
    // 2. 이미 존재하는 사용자면, 사용자 정보 업데이트
    console.log("이미 존재하는 사용자입니다");

    await updateUser(existingUser.id, {
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      detailAddress: data.detailAddress,
      phoneNumber: data.phoneNumber,
      password: hashedPassword,
    });

    userId = existingUser.id;

    // 새로은 회원가입 API 호출 시 중복을 막기 위해서~
    // 기존 선호 카테고리 삭제 후 새로 추가
    await prisma.userFavorCategory.deleteMany({
      where: { userId: userId }
    });

  } else {
    // 3. 새로운 사용자라면, 사용자 가입 처리
    console.log("새로운 사용자 가입입니다");
    
    userId = await addUser({
      email: data.email,
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      detailAddress: data.detailAddress,
      phoneNumber: data.phoneNumber,
      password: hashedPassword,
    });
  }

  // 3. 선호 카테고리 추가
  for (const preference of data.preferences) {
    await setPreference(userId, preference);
  }

  const user = await getUser(userId);
  const preferences = await getUserPreferencesByUserId(userId);

  return responseFromUser({ user, preferences });
};

export const listUserMissionsInProgress = async (userId) => {
  const missions = await getUserMissionInProgress(userId);
  return missions;
};

export const completeUserMission = async (userId, missionId) => {
  const result = await updateUserMissionToComplete(userId, missionId);
  if (result === 0) {
    throw new MissionNotInProgressError(
      "진행 중인 미션이 없거나 이미 완료된 미션입니다.",
      { userId, missionId }
    );
  }
  return { userId, missionId, status: "COMPLETE" };
};
