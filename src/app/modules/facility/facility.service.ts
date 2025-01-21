import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const createFacilityIntoDB = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  return result;
};

const updateFacilityFromDB = async (id: string, payload: TFacility) => {
  // console.log({ id, payload });
  
  // const result = await Facility.findByIdAndUpdate(id, payload, { new: true });
  const result = await Facility.findOneAndUpdate( { _id: id }, payload, { new: true });
  // console.log({ result });
  
  return result;
};

const getAllFacilitiesFromDB = async (payload: string) => {
  if (payload) {
    const result = await Facility.findById(payload, { isDeleted: false });
    return result;
  }
  const result = await Facility.find({ isDeleted: false });
  return result;
};

const getAllPopularFacilitiesFromDB = async () => {
  const result = await Facility.find({ isDeleted: false })
    .sort({ count: -1 })
    .limit(10);
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
  deleteFacilityFromDB,
  getAllPopularFacilitiesFromDB,
};
