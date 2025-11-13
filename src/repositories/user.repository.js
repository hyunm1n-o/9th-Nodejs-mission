import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (user) {
    return null;
  }

  const created = await prisma.user.create({ data: data });
  return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return user
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  await prisma.userFavorCategory.create({


    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    }
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.userFavorCategory.findMany({
    select: {
      id: true,
      userId: true,
      foodCategoryId: true,
      foodCategory: true,
    },
    where: { userId: userId },
    orderBy: { foodCategoryId: "asc" }
  });

  return preferences;
};

// 내가 진행중인 미션 가져오기
export const getUserMissionInProgress = async (userId) => {
  const ongoingMissions = await prisma.userMission.findMany({
    where: {
      userId: userId,
      status: "INPROGRESS"
    },
    orderBy: { id: "asc" }
  });
  return ongoingMissions;
};

// 진행 중인 미션을 진행 완료로 변경하기
export const updateUserMissionToComplete = async (userId, missionId) => {
  const updated = await prisma.userMission.updateMany({
    where: {
      userId: userId,
      missionId: missionId,
      status: "INPROGRESS"
    },
    data: {
      status: "COMPLETE"
    }
  });

  return updated.count;
};
