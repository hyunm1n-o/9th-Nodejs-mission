import { StatusCodes } from "http-status-codes";
import { listStoreMissions, listStoreReviews } from "../services/store.service.js"


export const handleListStoreReviews = async (req, res, next) => {
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};

export const handleListStoreMissions = async (req, res, next) => {
  const missions = await listStoreMissions(parseInt(req.params.storeId));
  res.status(StatusCodes.OK).success(missions);
};