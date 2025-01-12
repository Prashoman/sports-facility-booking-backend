
// name: The title of the facility.
// description: A brief description of the facility.
// pricePerHour: The cost of booking the facility per hour.
// location: The physical location of the facility.
// isDeleted


export type TFacility = {
    name: string;
    description: string;
    pricePerHour: number;
    location: string;
    isDeleted: boolean;
    image?: string;
}