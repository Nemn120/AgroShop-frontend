import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {

  registry: boolean;
  type: string;
  userType: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.registry = false;
  }

  public registryForm(rol: string): void{
    this.registry = true;
    switch(rol){
      case 'FARMER':this.type = "Agricultor"; break;
      case 'CLIENT': this.type = "Comprador"; break;
      case 'DRIVER': this.type = "Transportista"; break;
    }
    this.userType = rol;
  }




}
