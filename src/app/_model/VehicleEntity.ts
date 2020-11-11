import { MainBean } from './MainBean';
export class VehicleEntity extends MainBean{
    id : number;
    plateNumber : string;
    serialNumber : string;
    vehicleBrand : string;
    vehicleModel : string;
    vehicleHolder : string;
    yearsOfUse : number;
    statusCar : string;
    fuelType : string;
    netWeight : number;
    grossWeight : number;
}