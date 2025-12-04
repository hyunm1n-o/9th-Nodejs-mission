import { StatusCodes } from "http-status-codes";
import { listStoreMissions, listStoreReviews } from "../services/store.service.js"

// 가게 리뷰 목록 조회
export const handleListStoreReviews = async (req, res, next) => {
/*
    #swagger.summary = '가게 리뷰 목록 조회 API';
    #swagger.tags = ['Store'];
    #swagger.responses[200] = {
      description: "가게 리뷰 목록 조회 성공 응답",
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
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "integer"},
                        body: { type: "string"},
                        score: { type: "number" },
                        userId: { type: "integer" },
                        storeId: { type: "integer" },
                        createdAt: { type: "string", format: "date-time" },
                        user: {
                          type: "object",
                          properties: {
                            id: { type: "integer"},
                            name: { type: "string" },
                            email: { type: "string" }
                          }
                        },
                        store: {
                          type: "object",
                          properties: {
                            id: { type: "integer" },
                            name: { type: "string" }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "가게 리뷰 목록 조회 실패 응답",
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
                  reason: { type: "string", example: "존재하지 않는 가게입니다." },
                  data: { 
                    type: "object",
                    properties: {
                      storeId: { type: "integer" }
                    }
                  }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
const reviews = await listStoreReviews(

  /*
 #swagger.summary = '미션 완료 처리 API';
 #swagger.tags = ['Store'];
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
   description: "미션 완료 처리 실패 응답",
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
  parseInt(req.params.storeId),
  typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
);
res.status(StatusCodes.OK).success(reviews);
};

//미션 완료 처리
export const handleListStoreMissions = async (req, res, next) => {
  /*
 #swagger.summary = '미션 완료 처리 API';
 #swagger.tags = ['Store'];
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
   description: "가게 미션 완료 처리 실패 응답",
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
  const missions = await listStoreMissions(parseInt(req.params.storeId));
  res.status(StatusCodes.OK).success(missions);
};