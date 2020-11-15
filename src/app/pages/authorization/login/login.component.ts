import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  login(){
    //this.authService.login('condori','sirundercover1');
    this.authService.login('farmerjordy','jordy123');
   // this.authService.login('farmer2','123');
   // this.authService.login('cliente123','123');
   //this.authService.login('farmer2','123');
  }
  registry(){
    this.router.navigate(['auth/registry']);
  }

}
