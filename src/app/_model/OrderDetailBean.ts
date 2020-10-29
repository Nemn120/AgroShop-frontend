import { UserBean } from './UserBean';
import { ProductBean } from './ProductBean';
import { OrderBean } from './OrderBean';
import { MainBean } from './MainBean';

export class OrderDetailBean extends MainBean{
    id:number;
    status:string;
    price:number;
    userAttend:UserBean;
    userDelivery:UserBean;
    product:ProductBean;
    order:OrderBean;
    deliveryDate:Date;
    AttendDate:Date;
    menuProductId:number;
    companyName:string;
    orderId:number;

}
