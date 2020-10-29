import { UserBean } from './UserBean';
import { PlaceBean } from './PlaceBean';
export class CompanyBean{
    /* id:number;
    nombre:string;
    description:string;
    ruc:string;
    createDate:Date;
    userAdmin:UserBean
    estimatedTime:number;
    status:string;
    qualification:number;
    _foto: any;
    _isFoto: boolean; */

    id: number;
    nombre: string;
    ruc: string;
    businessName: string;
    description: string;
    address: string;
    phone: string;
    responsiblePaymentName: string;
    responsiblePaymentPhone: string;
    responsiblePaymentEmail: string;
    anniversaryDate: Date ;
    createDate: Date ;
    userAdmin: UserBean ;
    _foto: any ;

    businessLineCode: string;
    paymentMethodCode: string ;
    status: string;
    estimatedTime: number ;
    qualification: number ;
    attentionSchedule: string;

    sendProtocol:string;
    hourAttentionProtocol:string;
    timeEstimatedProtocol:string;
    additionalInformationProtocol:string;

    _flagLogoImage:boolean;
    _panelImage: any;
    _flagPanelImage:boolean;

    place:PlaceBean;
}
