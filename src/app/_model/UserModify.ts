import { MainBean } from './MainBean';

export class UserModify extends MainBean {
    id: number;
    name: string;
    lastName: string;
    address: string;
    cellPhone : number;
    email : string;
    region : string;
    province: string;
    district: string;
    photo : any;
}
