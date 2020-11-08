import {UserBean} from './UserBean';

export class DriverBean extends UserBean{
  driverLicenseNumber: string;
  userAccount: UserBean;
  yearsOfExperience: number;
  qualification: number;
}
