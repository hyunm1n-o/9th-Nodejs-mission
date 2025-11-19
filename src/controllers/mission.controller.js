import { StatusCodes } from "http-status-codes";
import { bodyToMission, bodyToUserMission } from "../dtos/mission.dto.js";
import { createMission, createUserMission } from "../services/mission.service.js";

// 미션추가
export const addMission = async (req, res, next) => {
      /*
    #swagger.summary = '미션 추가 API';
    #swagger.tags = ['Mission']
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              storeId: { type: "integer" },
              reward: { type: "integer" },
              deadline: { type: "string" },
              mission_spec: { type: "string" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "미션 추가 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
               properties: {
                  missionId: { type: "integer" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "S001" },
                  reason: { type: "string", example: "존재하지 않는 가게입니다" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
    console.log("미션추가를 요청했습니다!");
    console.log("body: req.body"); // 값이 잘 들어오나 확인하기 위한 테스트용

    const mission = await createMission(bodyToMission(req.body));
    res.status(StatusCodes.OK).success({ mission });
};

// 사용자 미션 연결
export const assignUserMission = async (req, res, next) => {
      /*
    #swagger.summary = '사용자 미션 연결 API';
    #swagger.tags = ['Mission']
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "integer" },
              missionId: { type: "integer" },
              status: { type: "string" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: " 사용자 미션 연결 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
               properties: {
                  userMissionId: { type: "integer" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: " 사용자 미션 연결 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U002" },
                  reason: { type: "string", example: "존재하지 않는 유저입니다" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
    console.log("사용자 미션 연결을 요청했습니다!");
    console.log("body: req.body"); // 값이 잘 들어오나 확인하기 위한 테스트용

    const mission = await createUserMission(bodyToUserMission(req.body));
    res.status(StatusCodes.OK).success({ mission });
};