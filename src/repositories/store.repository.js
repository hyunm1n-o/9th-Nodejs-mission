import { pool } from "../db.config.js";

// 가게 정보 불러오기
export const getStore = async (storeId) => {
  const conn = await pool.getConnection();

  try {
    const [store] = await pool.query(`SELECT * FROM store WHERE id = ?;`, storeId);

    console.log(store);

     if (store.length == 0) {
      return null;
    }

    return store;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

