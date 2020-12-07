import { UbigeoBean } from './UbigeoBean';

export class JobOfferByFields{
    status: string;
    weightIni: number;
    weightFin: number;
    priceIni: number;
    priceFin: number;
    idFarmer: number;
    
    originProvince:string;
	originRegion:string;
    originDistrict:string;
    
    destinationProvince:string;
	destinationRegion:string;
	destinationDistrict:string;
}