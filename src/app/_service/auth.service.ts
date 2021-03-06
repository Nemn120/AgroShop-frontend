import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { User } from '../_model/user';
import { SharedService } from './shared.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = `${environment.HOST}/oauth/token`;
  isLogged= false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private restService: RestService,
    private sharedService: SharedService) {}

  public getJWTByCredentials(username: string, password: string) {
    const body = `grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    return this.http.post(this.url, body, {

      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set('Authorization', 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD))
    });
  }

  public login(username: string, password: string) {
    this.getJWTByCredentials(username, password).subscribe((data: any) => {
      if (data) {
        const helper = new JwtHelperService();
        sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);
        const decodedToken = helper.decodeToken(data.access_token);
        if (decodedToken.authorities[0] != 'ADMIN') {
          const param = {
            username:username,
            userType: decodedToken.authorities[0]
          };
          this.restService.requestApiRestData('user/gubu', param).subscribe(result => {
          this.sharedService.userSession = result.data;
          this.isLogged = true;
          const param = {
            id: result.data.user.profile.idProfile
          };
          this.menuOptionByProfile(param, decodedToken.authorities[0]);
          this.restService.message('Bienvenido al sistema ', username);
        }, error => {
          console.error('error2', error);
        });
      } else {
        const param = {
          data:{
            username:username
          }
        };
        this.restService.requestApiRestData('user/gubus', param).subscribe(result => {
          this.sharedService.userSession={};
          this.sharedService.userSession.user=result.data;
          this.sharedService.appitems=[];
          this.router.navigate(['driver/list']);
        },error=>{
          console.error('error2', error);
        });
      }
    }
  });
  }

  public menuOptionByProfile(param, userTpe: string) {
    this.restService.requestApiRestData('menu/glmbi', param).subscribe(result => {
      this.sharedService.orderMenuOptionList(result.datalist);
      setTimeout(() => {
      if (userTpe =='DRIVER') {
        this.router.navigate(['vehicle/list']);
      }
      if (userTpe =='CLIENT') {
        this.router.navigate(['order/store']);
      }
      if (userTpe =='FARMER') {
        this.router.navigate(['product/list']);
      }
        if (userTpe =='ADMIN') {
        this.router.navigate(['driver/list']);
        }
      }, 1000);

    }, error => {
      console.error('error1', error);
    });
  }

  public getUser(): Observable<User> {
    return of({
      name: 'Nombre',
      lastName: 'Apellido',
      email: 'agroshop@gmail.com'
    });
  }

  public isLoggedIn() {
    /*let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return token != null;
    */
    return this.sharedService.userSession != null;
  }

  public closeSession() {
      sessionStorage.clear();
      this.sharedService.userSession = undefined;
      this.isLogged = false;
      this.sharedService.appitems=[];
      this.router.navigate(['/auth']);
      this.restService.message('Hasta pronto!', 'CLOSE');
  }
}
