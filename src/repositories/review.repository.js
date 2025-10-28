import { pool } from "../db.config.js";

// 가게에 리뷰 추가하기
export const addReview = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await pool.query(
      'INSERT INTO review (user_id, store_id, body, score) VALUES (?, ?, ?, ?);',
      [
        data.userId,
        data.storeId,
        data.body,
        data.score
      ]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
