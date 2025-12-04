
import { addReview } from "../repositories/review.repository.js";
import { getUser } from "../repositories/user.repository.js";
import { getStore } from "../repositories/store.repository.js";
import { UserNotFoundError, StoreNotFoundError } from "../errors.js";
// 가게에 리뷰 추가
export const createReview = async (data) => {
 // 1. 유저 존재 검증
const user = await getUser(data.userId);
if (!user) {
    throw new UserNotFoundError("존재하지 않는 유저입니다.", { userId: data.userId });
}

 // 2. 가게 존재 검증
 const store = await getStore(data.storeId);
if (!store) {
    throw new StoreNotFoundError("존재하지 않는 가게입니다.", { storeId: data.storeId });
}

  const reviewId = await addReview({
    userId: data.userId,
    storeId: data.storeId,
    body: data.body,
    score: data.score
  });

  return reviewId;
};