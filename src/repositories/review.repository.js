import { prisma } from "../db.config.js";

// 가게에 리뷰 추가하기
export const addReview = async (data) => {
  const review = await prisma.review.create({
    data: {
      userId: data.userId,
      storeId: data.storeId,
      body: data.body,
      score: data.score
    }
  })
  return review.id;
};
