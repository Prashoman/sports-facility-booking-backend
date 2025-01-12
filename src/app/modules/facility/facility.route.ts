import express, { NextFunction, Request, Response } from "express";
import { validationMiddleware } from "../../middleware/Validation.Middelware";
import { FacilityValidation } from "./facility.validation";
import { FacilityController } from "./facility.controller";
import auth from "../../middleware/auth";
import { multerUpload } from "../../config/multer.config";

const route = express.Router();

route.post(
  "/facility",
  auth("admin"),
  multerUpload.single("facilityImage"),
  (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body);
    req.body = JSON.parse(req.body.data);
    next();
  },
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

route.delete("/facility/:id", auth("admin"), FacilityController.deleteFacility);

export const FacilityRoute = route;
