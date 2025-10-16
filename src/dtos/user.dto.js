export const bodyToUser = (body) => {
    const birth = new Date(body.birth); // 날짜변환

  return {
    email: body.email, //필수 
    name: body.name, // 필수
    gender: body.gender, // 필수
    birth, // 필수
    address: body.address || "", //선택 
    detailAddress: body.detailAddress || "", //선택 
    phoneNumber: body.phoneNumber,//필수
    preferences: body.preferences,// 필수 
  };
};

export const responseFromUser = ({ user, preferences }) => {
    return {
        email: user[0].email,
        name: user[0].name,
        preferCategory: preferences.map(pref => pref.name)
    };
};

export const bodyToReview = (body) => {
  return {
    userId: body.userId, // 필수
    storeId: body.storeId, // 필수
    body: body.body, // 필수 
    score: body.score // 필수 
  };
};

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