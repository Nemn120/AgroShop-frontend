import { HttpClient,HttpHeaders } from '@angular/common/http';
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

  url: string = `${environment.HOST}/oauth/token`;
  isLogged:boolean=false;
  constructor(
    private http: HttpClient, 
    private router: Router,
    private restService:RestService,
    private sharedService:SharedService)
    {}    

  public getJWTByCredentials(username:string,password:string){
    const body = `grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    console.log(this.url);
    return this.http.post(this.url, body, {
     
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set('Authorization', 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD))
    });
  }

  public login(username : string, password:string){
    this.getJWTByCredentials(username,password).subscribe((data:any) =>{
      if(data){
        const helper = new JwtHelperService();
        sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);
        const decodedToken = helper.decodeToken(data.access_token)
        let param={
          username:username,
          userType:decodedToken.authorities[0]
        }
        this.restService.requestApiRestData("user/gubu",param).subscribe(result =>{
          this.sharedService.userSession=result.data;
          this.isLogged=true;
          let param={
            id: result.data.user.profile.idProfile
          }
          this.restService.requestApiRestData("menu/glmbi",param).subscribe(result =>{
            this.sharedService.orderMenuOptionList(result.datalist);
          console.log(result);
          setTimeout(()=>{
            
            if(this.sharedService.userSession.user.profile.name=="DRIVER")
              this.router.navigate(['vehicle/list']);
            if(this.sharedService.userSession.user.profile.name=="CLIENT")
              this.router.navigate(['order/store']);
            if(this.sharedService.userSession.user.profile.name=="FARMER")
              this.router.navigate(['product/list']);

            this.restService.message('Bienvenido al sistema ',username);
          },1000);
          
          },error=>{
            console.error('error1',error);
          })
        },error=>{
          console.error('error2',error);
        })
      }
    }, error =>{
      console.error('error3',error);
    })  

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
      this.sharedService.userSession=undefined;
      this.isLogged=false;
      this.router.navigate(['/auth']);
  }
}
