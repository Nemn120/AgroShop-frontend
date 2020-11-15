import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {

  userType:string;

  constructor(private router: Router) { }

  ngOnInit(): void {


this.router.
    switch(rol){
      case 'FARMER':this.title = "Agricultor"; this.image = '/assets/images/agricultor.jpg/'; break;
      case 'CLIENT': this.title = "Comprador"; this.image = '/assets/images/comprador.jpg/' ;break;
      case 'DRIVER': this.title = "Transportista"; break;
    }
    
    

  }





}
