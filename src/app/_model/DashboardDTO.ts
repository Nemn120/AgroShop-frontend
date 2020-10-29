import { OrderBean } from './OrderBean';

export class DashBoardDTO {

  salesToday: number;
  salesYesterday: number;
  salesVariationDay: number;
  salesThisWeek: number;
  salesLastWeek: number;
  salesVariationWeek: number;
  quantityToday: number;
  quantityYesterday: number;
  quantityVariationDay: number;
  quantityThisWeek: number;
  quantityLastWeek: number;
  quantityVariationWeek: number;
  orderPending: OrderBean[];
  orderDelivery: OrderBean[];
  orderDelivered: OrderBean[];

}
