

export const bodyToReview = (body) => {
  return {
    userId: body.userId, // 필수
    storeId: body.storeId, // 필수
    body: body.body, // 필수 
    score: body.score // 필수 
  };
};
