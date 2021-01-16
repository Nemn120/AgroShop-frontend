import { UserBean } from './UserBean';
import { OrderDetailBean } from './OrderDetailBean';
import { MainBean } from './MainBean';
import { ClientBean } from './ClientBean';
import { FarmerBean } from './FarmerBean';
import { PlaceBean } from './PlaceBean';
export class OrderBean extends MainBean{
     id:number;
     total:number;
     quantity:number;
     client:ClientBean;
     phone:string;
     address:string;
     orderDetailList:OrderDetailBean[];
     deliveryDate : Date;
     attentDate : Date;
     farmer:FarmerBean;
     reference:string;
     destinationProvince: string;
     destinationRegion: string;
     destinationDistrict: string;

     destinyPlace:PlaceBean
}