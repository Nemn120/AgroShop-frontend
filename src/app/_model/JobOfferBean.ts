import { MainBean } from './MainBean';
import { OrderBean } from './OrderBean';

export class JobOfferBean extends MainBean {

    id: number;
    finalDate: Date;
     statusOffer: string;
     description: string;
     title: string;
     shippingCost: number;
     requirements: string;
     totalWeight: number;
     departmentOrigin: string;
     order: OrderBean;

    originProvince: string;
    originRegion: string;
    originDistrict: string;
}
