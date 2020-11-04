import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { MenuOptionBean } from '../_model/MenuOptionBean';
import { AuthService } from './auth.service';
import { SharedService } from './shared.service';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor( private router: Router,
    private authService:AuthService,
    private sharedService:SharedService,
    private restService:RestService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let rpta = this.authService.isLoggedIn();
    if (!rpta) {
      sessionStorage.clear();
      this.router.navigate(['auth/login']);
      return false;
    } else {
      let token = sessionStorage.getItem(environment.TOKEN_NAME);

      const helper = new JwtHelperService();
      if (!helper.isTokenExpired(token)) {
        const decodedToken = helper.decodeToken(token);
        let url = state.url; // /pelicul
    /*    return this.restService.requestApiRestData(this.sharedService.userSession.profile.idProfile).pipe(map((data: MenuOptionBean[]) => {
          this.menuService.menuCambio=data; 
          let cont = 0;
          for (let menuBD of data) {
            if (url.startsWith(menuBD.urlMenu)) {
              cont++;
              break;
            }
          }

          if (cont > 0) {
            return true;
          } else {
            this.router.navigate(['auth/login']);
            return false;
          }
        }, error =>{
          console.error(error);
        }));
        */
      } else {
        sessionStorage.clear();
        this.router.navigate(['auth/login']);
        return false;
      }
    }

  }
}

