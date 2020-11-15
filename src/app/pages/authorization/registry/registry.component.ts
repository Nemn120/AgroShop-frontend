import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { CentralViewComponent } from '../login/central-view/central-view.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {

  userType:string;
  title: string;
  image: any;
  rol: string;
  constructor(private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(param=>{
      this.rol = param['rol'];
      console.log(this.rol);
    })
    switch(this.rol){
      case 'FARMER':this.title = "Agricultor"; this.image = '/assets/images/agricultor.jpg/'; break;
      case 'CLIENT': this.title = "Comprador"; this.image = '/assets/images/comprador.jpg/' ;break;
      case 'DRIVER': this.title = "Transportista";this.image = '/assets/images/transportista.jpg/'; break;
    }
    this.userType = this.rol;
  }





}
