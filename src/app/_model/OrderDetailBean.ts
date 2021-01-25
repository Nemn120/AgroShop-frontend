
import { OrderBean } from './OrderBean';
import { MainBean } from './MainBean';
import { ProductSalesBean } from './ProductSalesBean';
export class OrderDetailBean extends MainBean{
    id:number;
    price:number;
    customOrder:OrderBean;
    quantity:number;
    total:number;
    productSales:ProductSalesBean;
    _foto:any; 
    _isFoto: boolean;   

    productName:string;
    measureUnite:string;
}
