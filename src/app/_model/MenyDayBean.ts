import { MenuDayProductBean } from './MenuDayProductBean';
import { MainBean } from './MainBean';
export class MenuDayBean extends MainBean{
    id:number;
    name:string;
    description:string;  // fecha de creacion
    day:String; // LUNES, MARTES ,MIERCOLES DOMINGO
    type:string; // COMBO ,MENU , Promocion
    
    menuDayProductList:MenuDayProductBean[] // PRODUCTOS , PRECIO, CANTIDAD , ESTADO 
    status:string; // ACTIVO O DESACTIVO
    localDateTime:Date;
    total:number;
    countTotal:number;
}