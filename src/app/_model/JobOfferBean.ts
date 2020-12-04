import { OrderBean } from './OrderBean';

export class JobOfferBean {

  id: number;
  startDate: Date;
  finalDate: Date;
  statusOffer: string;
  description: string;
  title: string;
  shippingCost: number;
  requirements: string;
  order: OrderBean;

}
