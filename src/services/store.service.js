
import { getAllStoreReviews, getAllStoreMission  } from "../repositories/store.repository.js";
import { responseFromReviews, responseFromMission } from "../dtos/store.dto.js";

export const listStoreReviews = async (storeId) => {
  const reviews = await getAllStoreReviews(storeId);
  return responseFromReviews(reviews);
};

export const listStoreMissions = async (storeId) => {
  const mission = await getAllStoreMission(storeId);
  return responseFromMission(mission);
};
