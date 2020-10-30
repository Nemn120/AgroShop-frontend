import { ProfileBean } from './ProfileBean';
import { MainBean } from './MainBean';
import { MenuOptionBean } from './MenuOptionBean';


export class ProfileMenuOptionBean extends MainBean{
    id:number;
    profile:ProfileBean;
    menu:MenuOptionBean[];

}