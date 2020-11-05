import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuOptionBean } from './_model/MenuOptionBean';
import { AuthService } from './_service/auth.service';
import { SharedService } from './_service/shared.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loadingSpinner: boolean = false;
  constructor(public authService:AuthService, public router:Router,
    public sharedService:SharedService
    ){
      if(!this.sharedService.userSession)
      this.router.navigate(["auth/login"])
     }

    ngOnInit(){
    }
}
