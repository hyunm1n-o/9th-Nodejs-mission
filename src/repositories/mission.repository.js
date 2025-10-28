import { pool } from "../db.config.js";

// 가게에 미션 추가하기
export const addMission = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await pool.query(
      'INSERT INTO mission (store_id, reward, deadline, mission_spec) VALUES (?, ?, ?, ?);',
      [
        data.storeId,
        data.reward,
        data.deadline,
        data.mission_spec
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

// 미션 도전하기 (가게의 미션을 도전 중인 미션에 추가)
export const addUserMission = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await pool.query(
      'INSERT INTO user_mission (user_id, mission_id, status) VALUES (?, ?, ?);',
      [
        data.userId,
        data.missionId,
        data.status
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

// 미션 정보 불러오기
export const getMission = async (missionId) => {
  const conn = await pool.getConnection();

  try {
    const [mission] = await pool.query(`SELECT * FROM mission WHERE id = ?;`, [missionId]);

    console.log(mission);

     if (mission.length == 0) {
      return null;
    }

    return mission;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};