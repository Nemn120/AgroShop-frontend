import { ProfileMenuOptionBean } from './ProfileMenuOptionBean';
import { CategoryProductBean } from './CategoryProductBean';
import { MainBean } from './MainBean';

export class ProductBean extends MainBean{
    id:number;
    name:string;
    description:string;
    categoryProduct:CategoryProductBean;
    _foto: any;
    _isFoto: boolean;
}