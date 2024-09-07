import { Request, Response } from "express";
import catchAsyn from "../../../utils/catchAsyn";
import sendResponse from "../../../utils/sendResponse";
import { FacilityService } from "./facility.service";
import httpStatus from "http-status";

const createFacility = catchAsyn(async (req: Request, res: Response) => {
  const facilityInfo = req.body;
  const insertedFacility = await FacilityService.createFacilityIntoDB(
    facilityInfo
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: insertedFacility,
    message: "Facility added successfully",
  });
});

const updateFacility = catchAsyn(async (req: Request, res: Response) => {
  const facilityId = req.params.id;
  const facilityInfo = req.body;
  const insertedFacility = await FacilityService.updateFacilityFromDB(
    facilityId,
    facilityInfo
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: insertedFacility,
    message: "Facility updated successfully",
  });
});

const getAllFacilities = catchAsyn(async (req: Request, res: Response) => {
  const allFacilities = await FacilityService.getAllFacilitiesFromDB();
  if(allFacilities.length === 0){
    sendResponse(res, {
       statusCode: httpStatus.NOT_FOUND,
       success: false,
       data: allFacilities,
       message: "No data found",
    });
}
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: allFacilities,
    message: "All facilities fetched successfully",
  });
});

const deleteFacility = catchAsyn(async (req: Request, res: Response) => {
  const facilityId = req.params.id;
  await FacilityService.deleteFacilityFromDB(facilityId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facility deleted successfully",
    data: {},
  });
});

export const FacilityController = {
  createFacility,
  updateFacility,
  getAllFacilities,
  deleteFacility,
};
