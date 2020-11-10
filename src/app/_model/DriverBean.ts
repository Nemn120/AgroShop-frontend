import { MainBean } from './MainBean';
import { UserBean } from './UserBean';

export class DriverBean extends MainBean{
  id: number;
  driverLicenseNumber: string;
  yearsOfExperience: string;
  qualification: number;
  user: UserBean;
}
