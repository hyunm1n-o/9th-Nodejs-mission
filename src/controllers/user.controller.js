import { StatusCodes } from "http-status-codes";
import { bodyToMission, bodyToReview, bodyToUser, bodyToUserMission } from "../dtos/user.dto.js";
import { createMission, createReview, createUserMission, userSignUp } from "../services/user.service.js";
import { addMission, addReview, addUserMission } from "../repositories/user.repository.js";

// 회원가입 
export const handleUserSignUp = async (req, res, next) => {
    console.log("회원가입을 요청했습니다!");
    console.log("body: req.body"); // 값이 잘 들어오나 확인하기 위한 테스트용

    const user = await userSignUp(bodyToUser(req.body));
    res.status(StatusCodes.OK).json({ result: user });
};

// 리뷰추가
export const handleCreateReview = async (req, res, next) => {
    console.log("리뷰작성을 요청했습니다!");
    console.log("body: req.body"); // 값이 잘 들어오나 확인하기 위한 테스트용

    const user = await createReview(bodyToReview(req.body));
    res.status(StatusCodes.OK).json({ result: addReview });
};

// 미션추가
export const handleCreateMission = async (req, res, next) => {
    console.log("미션추가를 요청했습니다!");
    console.log("body: req.body"); // 값이 잘 들어오나 확인하기 위한 테스트용

    const user = await createMission(bodyToMission(req.body));
    res.status(StatusCodes.OK).json({ result: addMission });
};

// 사용자 미션 연결
export const handleCreateUserMission = async (req, res, next) => {
    console.log("사용자 미션 연결을 요청했습니다!");
    console.log("body: req.body"); // 값이 잘 들어오나 확인하기 위한 테스트용

    const user = await createUserMission(bodyToUserMission(req.body));
    res.status(StatusCodes.OK).json({ result: addUserMission });
};