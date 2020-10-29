import { ProductBean } from './ProductBean';
import { MenuDayBean } from './MenyDayBean';
import { MainBean } from './MainBean';
export class MenuDayProductBean extends MainBean{
    id:number;
    product:ProductBean; // 
    menuDay:MenuDayBean; // NO TIENE
    price:number;
    quantity:number;
    quantityAdd:number;
    available:number;
    status:string; // DISPONIBLE , NO DISPONIBLE
    type:string; // COMBO, MENU , PAQUETE
    menuDayId:number; // ACA ESTA EL ID
}