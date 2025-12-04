

export const bodyToMission = (body) => {
  const deadline = new Date(body.deadline); // 날짜변환

  return {
    storeId: body.storeId, // 필수 
    reward: body.reward, // 필수 
    deadline, // 필수
    mission_spec: body.mission_spec, // 필수 
  };
};

export const bodyToUserMission = (body) => {
  return {
    userId: body.userId, // 필수 
    missionId: body.missionId, // 필수 
    status: body.status || "" // 선택
  };
};