
import { getAllStoreReviews, getAllStoreMission  } from "../repositories/store.repository.js";
import { responseFromReviews, responseFromMission } from "../dtos/store.dto.js";

export const listStoreReviews = async (storeId, cursor) => { 
  const reviews = await getAllStoreReviews(storeId, cursor); 
  return responseFromReviews(reviews);
};

export const listStoreMissions = async (storeId) => {
  const missions = await getAllStoreMission(storeId);
  return responseFromMission(missions);
};
