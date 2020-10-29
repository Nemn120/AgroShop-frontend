import { UserBean } from './UserBean';
import { CompanyBean } from './CompanyBean';
export class SucursalBean{
    id : number;
    nombre:string;
    direccion:string;
    phone:string;
    userAdmin:UserBean;
    company:CompanyBean;
    createDate:Date;
    _foto: any;
    _isFoto: boolean;
}