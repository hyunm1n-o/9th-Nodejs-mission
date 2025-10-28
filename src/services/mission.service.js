
import {
  addMission,
  getMission,
  addUserMission
} from "../repositories/mission.repository.js";

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