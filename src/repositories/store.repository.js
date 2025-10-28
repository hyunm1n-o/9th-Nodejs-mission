import { prisma } from "../db.config.js";

// 가게 정보 불러오기
export const getStore = async (storeId) => {
   const store = await prisma.store.findUnique({
      where: { id: storeId },
    });

    return store || null; // 없으면 null 리턴
};


export const getAllStoreReviews = async (storeId) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: {
      id: true,
      content: true,
      storeId: true,
      userId: true,
      store: true,
      user: true,
    },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};

// 특정 가게의 미션 목록 불러오기
export const getAllStoreMission = async (storeId) => {
  const storeMissions = await prisma.mission.findMany({
      select: {
      id: true,
      storeId: true,
      reward: true,
      deadline: true,
      missionSpec: true,
    },
      where: { id: storeId },
      orderBy: { id: "asc" }
    });

    return storeMissions || null; // 없으면 null 리턴
};