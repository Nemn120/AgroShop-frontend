import { MainBean } from './MainBean';
import { OrderBean } from './OrderBean';
export class ComplaintBean extends MainBean{

    id:number;
    titulo:string;
    description: string;
    orderId: number;
    createDate: Date; 
    _foto: any;
    _isFoto: boolean;
    

}