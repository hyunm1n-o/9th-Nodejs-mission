import {
  addMission,
  getMission,
  addUserMission
} from "../repositories/mission.repository.js";
import { getUser } from "../repositories/user.repository.js";
import { getStore } from "../repositories/store.repository.js";
import {
  UserNotFoundError,
  StoreNotFoundError,
  MissionNotFoundError,
  DuplicateMissionError
} from "../errors.js";

// 가게에 미션 추가
export const createMission = async (data) => {

  // 1. 가게 존재 검증
  const store = await getStore(data.storeId);
  if (!store) {
    throw new StoreNotFoundError("존재하지 않는 가게입니다.", { storeId: data.storeId });
  }

  const missionId = await addMission({
    storeId: data.storeId,
    reward: data.reward,
    deadline: data.deadline,
    mission_spec: data.mission_spec
  });

  return missionId;
};

// 사용자 미션 연결
export const createUserMission = async (data) => {
  // 1. 유저 존재 검증
  const user = await getUser(data.userId);
  if (!user) {
    throw new UserNotFoundError("존재하지 않는 유저입니다.", { userId: data.userId });
  }

  // 2. 미션 존재 검증
  const mission = await getMission(data.missionId);
  if (!mission) {
    throw new MissionNotFoundError("존재하지 않는 미션입니다.", { missionId: data.missionId });
  }

  const userMissionId = await addUserMission({
    userId: data.userId,
    missionId: data.missionId,
    status: data.status
  });

  return userMissionId;
};