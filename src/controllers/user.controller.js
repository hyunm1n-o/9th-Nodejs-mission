import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import {
  userSignUp,
  listUserMissionsInProgress,
  completeUserMission
} from "../services/user.service.js";

// 회원가입 
export const handleUserSignUp = async (req, res, next) => {
  /*
 #swagger.summary = '회원 가입 API';
 #swagger.tags = ['User'];
 #swagger.requestBody = {
   required: true,
   content: {
     "application/json": {
       schema: {
         type: "object",
         properties: {
           email: { type: "string" },
           name: { type: "string" },
           gender: { type: "string" },
           birth: { type: "string", format: "date" },
           address: { type: "string" },
           detailAddress: { type: "string" },
           phoneNumber: { type: "string" },
           preferences: { type: "array", items: { type: "number" } }
         }
       }
     }
   }
 };
 #swagger.responses[200] = {
   description: "회원 가입 성공 응답",
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
               email: { type: "string" },
               name: { type: "string" },
               preferCategory: { type: "array", items: { type: "string" } }
             }
           }
         }
       }
     }
   }
 };
 #swagger.responses[400] = {
   description: "회원 가입 실패 응답",
   content: {
     "application/json": {
       schema: {
         type: "object",
         properties: {
           resultType: { type: "string", example: "FAIL" },
           error: {
             type: "object",
             properties: {
               errorCode: { type: "string", example: "U001" },
               reason: { type: "string" },
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

  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));

  res.status(StatusCodes.OK).success(user);

};

// 진행 중인 미션 목록 조회 API
export const handleListUserMissionsInProgress = async (req, res, next) => {
 /*
 #swagger.summary = '진행 중인 미션 목록 조회 API';
 #swagger.tags = ['User'];
 #swagger.responses[200] = {
   description: "진행 중인 미션 목록 조회 성공 응답",
   content: {
     "application/json": {
       schema: {
         type: "object",
         properties: {
          missions: {
            type: "array",
            items: {
	            id: { type: "integer" },
	            userId: { type: "integer" },
	            missionId: { type: "integer" },
	            status: { type: "string" },
	            createdAt: { type: "string", format: "date-time" },
	            updatedAt: { type: "string", format: "date-time" },
             }
           }
         }
       }
     }
   }
 };
 #swagger.responses[400] = {
   description: "진행 중인 미션 목록 조회 실패 응답",
   content: {
     "application/json": {
       schema: {
         type: "object",
         properties: {
           resultType: { type: "string", example: "FAIL" },
           error: {
             type: "object",
             properties: {
               errorCode: { type: "string", example: "U001" },
               reason: { type: "string" },
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
  const userId = parseInt(req.params.userId);
  const missions = await listUserMissionsInProgress(userId);

  res.status(StatusCodes.OK).success(missions);
};

// 미션 완료 API
export const handleCompleteUserMission = async (req, res, next) => {
  /*
   #swagger.summary = '미션 완료 처리 API';
   #swagger.tags = ['User']
   #swagger.responses[200] = {
     description: "미션 완료 처리 성공 응답",
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
                 userId: { type: "integer" },
                 missionId: { type: "integer" },
                 status: { type: "string" }
               }
             }
           }
         }
       }
     }
   };
#swagger.responses[400] = {
      description: "진행 중인 미션 목록 조회 실패 응답",
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
                  reason: { type: "string", example: "존재하지 않는 유저입니다." },
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
  const userId = parseInt(req.params.userId);
  const missionId = parseInt(req.params.missionId);

  const result = await completeUserMission(userId, missionId);
  res.status(StatusCodes.OK).success(result);
};
