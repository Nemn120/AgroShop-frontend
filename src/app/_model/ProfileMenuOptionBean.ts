import { MenuOptionBean } from './MenuOptionBean';
import { ProfileBean } from './ProfileBean';
import { MainBean } from './MainBean';


export class ProfileMenuOptionBean extends MainBean{
    id:number;
    profile:ProfileBean;
    menu:MenuOptionBean[];

}