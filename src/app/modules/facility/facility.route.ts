import  express  from "express";
import { validationMiddleware } from "../../middleware/Validation.Middelware";
import { FacilityValidation } from "./facility.validation";
import { FacilityController } from "./facility.controller";


const route = express.Router();


route.post('/facility', validationMiddleware(FacilityValidation.FacilityCreateValidation), FacilityController.createFacility);

route.put('/facility/:id', validationMiddleware(FacilityValidation.FacilityUpdateValidation), FacilityController.updateFacility);

route.get('/facility', FacilityController.getAllFacilities);

route.delete('/facility/:id', FacilityController.deleteFacility);



export const FacilityRoute = route;