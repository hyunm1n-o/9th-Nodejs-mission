

// 가게에 미션 추가하기
export const addMission = async (data) => {
  const mission = await prisma.mission.create({
      data: {
        storeId: data.storeId,
        reward: data.reward,
        deadline: data.deadline,
        missionSpec: data.mission_spec
      },
    });

    return mission.id;
};

// 미션 도전하기 (가게의 미션을 도전 중인 미션에 추가)
export const addUserMission = async (data) => {
  const userMission = await prisma.userMission.create({
      data: {
        userId: data.userId,
        missionId: data.missionId,
        status: data.status,
      },
    });

    return userMission.id;
};

// 미션 정보 불러오기
export const getMission = async (missionId) => {
  const mission = await prisma.mission.findUnique({
      where: { id: missionId },
    });

    return mission || null; // 없으면 null 리턴
};
