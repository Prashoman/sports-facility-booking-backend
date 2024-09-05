import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const createFacilityIntoDB = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  return result;
};

const updateFacilityFromDB = async (id: string, payload: TFacility) => {
  const result = await Facility.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const getAllFacilitiesFromDB = async () => {
  const result = await Facility.find({ isDeleted: false });
  return result;
};

const deleteFacilityFromDB = async (id: string) => {
  const result = await Facility.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      isDeleted: true,
    },
    { new: true }
  );
  return result;
};

export const FacilityService = {
  createFacilityIntoDB,
  updateFacilityFromDB,
  getAllFacilitiesFromDB,
  deleteFacilityFromDB
};
