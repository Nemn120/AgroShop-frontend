import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../_service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-central-view',
  templateUrl: './central-view.component.html',
  styleUrls: ['./central-view.component.scss']
})
export class CentralViewComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.login('farmer2','123');
  }
  registry(){
    this.router.navigate(['auth/registry']);
  }

}
