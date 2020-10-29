import { ProfileMenuOptionBean } from './ProfileMenuOptionBean';
import { MainBean } from './MainBean';

export class ProfileBean extends MainBean{
    idProfile: number;
    description:string;
    listProfileMenuOption:ProfileMenuOptionBean[];
    name:string;
}