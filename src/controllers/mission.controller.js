import { StatusCodes } from "http-status-codes";
import { bodyToMission, bodyToUserMission } from "../dtos/mission.dto.js";
import { createMission, createUserMission } from "../services/mission.service.js";

// 미션추가
export const addMission = async (req, res, next) => {
    console.log("미션추가를 요청했습니다!");
    console.log("body: req.body"); // 값이 잘 들어오나 확인하기 위한 테스트용

    const mission = await createMission(bodyToMission(req.body));
    res.status(StatusCodes.OK).success({ mission });
};

// 사용자 미션 연결
export const assignUserMission = async (req, res, next) => {
    console.log("사용자 미션 연결을 요청했습니다!");
    console.log("body: req.body"); // 값이 잘 들어오나 확인하기 위한 테스트용

    const mission = await createUserMission(bodyToUserMission(req.body));
    res.status(StatusCodes.OK).success({ mission });
};