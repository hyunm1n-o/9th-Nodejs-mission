import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { createReview } from "../services/review.service.js";

// 리뷰추가
export const addReview = async (req, res, next) => {
    /*
 #swagger.summary = '리뷰 작성 API';
 #swagger.tags = ['Store'];
 #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "integer" },
		          storeId: { type: "integer" },
		          body: { type: "string" },
		          score: { type: "number", format: "float" }
            }
          }
        }
      }
    };

 #swagger.responses[200] = {
   description: "리뷰 작성 성공 응답",
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
                  reviewId: { type: "integer" }
                }
              }
            }
          }
        }
      }
    };
 #swagger.responses[400] = {
   description: "리뷰 작성 실패 응답",
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

    console.log("리뷰작성을 요청했습니다!");
    console.log("body: req.body"); // 값이 잘 들어오나 확인하기 위한 테스트용

    const review = await createReview(bodyToReview(req.body));
    res.status(StatusCodes.OK).success(review);
};
