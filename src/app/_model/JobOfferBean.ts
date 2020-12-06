import { MainBean } from './MainBean';
import { OrderBean } from './OrderBean';

export class JobOfferBean extends MainBean{
     
     finalDate: Date;
     statusOffer:string;
     description:string;
     title:string;
     shippingCost:number;
     requirements: string;
     totalWeight: number;
     departmentOrigin: string;
     order: OrderBean;
     
    originProvince:String;
    originRegion:String;
    originDistrict:String;
}