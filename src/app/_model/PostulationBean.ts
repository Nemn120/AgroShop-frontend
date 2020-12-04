import { DriverBean } from './DriverBean';
import { JobOfferBean } from './JobOfferBean';

export class PostulationBean {

  id: number;
  statusPostulation: string;
  postulationDate: Date;
  detail: string;
  reply: string;
  jobOffer: JobOfferBean;
  driver: DriverBean;

}

