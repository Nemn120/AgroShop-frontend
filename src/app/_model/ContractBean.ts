import { PostulationBean } from './PostulationBean';

export class ContractBean {

  id: number;
  initDate: Date;
  timeContract: number;
  endContract: Date;
  nameContract: string;
  expired: boolean;
  status: string;
  fileContract: string;
  createDate: Date;
  isDeleted: boolean;
  updateDate: Date;
  postulation: PostulationBean;
}
