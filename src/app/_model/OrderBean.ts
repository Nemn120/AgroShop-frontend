import { UserBean } from './UserBean';
import { OrderDetailBean } from './OrderDetailBean';
import { MainBean } from './MainBean';
import { PlaceBean } from './PlaceBean';
export class OrderBean extends MainBean{
     id:number;
     status:string;
     total:number;
     quantity:number;
     userOrder:UserBean;
     phone:string;
     address:string;
     place:PlaceBean;
     orderDetail:OrderDetailBean[];
     deliveryDate : Date;
     attentDate : Date;
     userAttendId:number;
     userDeliveryId:number;
     reference:string;
     companyName:string;
}