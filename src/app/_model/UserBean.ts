import { ProfileBean } from './ProfileBean';
import { MainBean } from './MainBean';

export class UserBean extends MainBean{
    id: number;
    nombre: string;
    profile: ProfileBean;
    password:string;
    status: string;
    address: string;
    cellPhone:string;
    username:string;
    employeeCode:string;
    documentTypeId:string;
    documentNumber:string;
    lastName:string;
    dateBirth:Date;
    _foto: any;
    _isFoto: boolean;
}
