import {FarmerBean} from '../_model/FarmerBean';
import {ProductSalesBean} from '../_model/ProductSalesBean';

export class FarmerAndProductsDTO{
    _organization: FarmerBean;
    _listOfProductsShowed: any;
    _categoryProductName:string;
    _menuProductList:any;
}
