import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    public sharedService:SharedService,
    private snackBar: MatSnackBar
    ){
      if(!this.sharedService.userSession)
      this.router.navigate(["auth/login"])

      this.sharedService.messageChange.subscribe(data=>{
        this.snackBar.open(data, 'INFO', {
          duration: 3000
        });
      })
    
     }

    ngOnInit(){
      
    }
}
