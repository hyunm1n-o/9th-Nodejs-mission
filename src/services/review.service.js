
import {
  addReview,
} from "../repositories/review.repository.js";

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