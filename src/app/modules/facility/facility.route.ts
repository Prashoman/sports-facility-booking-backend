import express, { NextFunction, Request, Response } from "express";
import { validationMiddleware } from "../../middleware/Validation.Middelware";
import { FacilityValidation } from "./facility.validation";
import { FacilityController } from "./facility.controller";
import auth from "../../middleware/auth";

const route = express.Router();

route.post(
  "/facility",
  auth("admin"),
  validationMiddleware(FacilityValidation.FacilityCreateValidation),
  FacilityController.createFacility
);

route.put(
  "/facility/:id",
  auth("admin"),
  validationMiddleware(FacilityValidation.FacilityUpdateValidation),
  FacilityController.updateFacility
);

route.get("/facility/:facilityId?", FacilityController.getAllFacilities);

route.get("/popular/facility", FacilityController.getPopularFacilities)

route.delete("/facility/:id", auth("admin"), FacilityController.deleteFacility);

export const FacilityRoute = route;
