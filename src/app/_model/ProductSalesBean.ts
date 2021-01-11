import { MainBean } from './MainBean';
import { ProductBean } from './ProductBean';
import { PlaceBean } from './PlaceBean';

export class ProductSalesBean extends MainBean{
    id: number;
    product:ProductBean;
    price:number;
    totalQuantity:number;
    availableQuantity:number;
    type:String;
    farmerNumber:number;
    measureUnite:String;
    validity:String;
    discount:String;
    weight:String;
    offerPrice:number;
    statusSales:String;
    quantitySelect:number;

    originPlace:PlaceBean;

}