import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

<<<<<<< HEAD
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

=======
>>>>>>> origin/develop
}
