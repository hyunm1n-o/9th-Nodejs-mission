import { prisma } from "../db.config.js";

// 가게 정보 불러오기
export const getStore = async (storeId) => {
   const store = await prisma.store.findUnique({
      where: { id: storeId },
    });

    return store || null; // 없으면 null 리턴
};


export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.review.findMany({ 
    select: {
      id: true,
      body: true, 
      score: true, 
      userId: true,
      storeId: true,
      user: true,
      store: true,
      createdAt: true,
    },
    where: { storeId: storeId, id: { gt: cursor } }, // cursor는 이제 파라미터로 받음
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

    return storeMissions;
};