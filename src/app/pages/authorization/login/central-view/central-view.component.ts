import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../_service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-central-view',
  templateUrl: './central-view.component.html',
  styleUrls: ['./central-view.component.scss']
})
export class CentralViewComponent implements OnInit {

  loginForm: FormGroup;

  username: string;
  password: string;
  enProceso:boolean=false;

  //PARA REGISTRO
  title: string;
  userType: string;
  image: any;
  constructor(
    private authService:AuthService,
    private router:Router,
    private snack: MatSnackBar,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  //falta validar credenciales incorrectos(back)
  login(){

    if (this.loginForm.invalid) {
      return;
    }
    this.enProceso=true;
    this.username = this.loginForm.value['username'];
    this.password = this.loginForm.value['password'];
    this.authService.login(this.username,this.password);
    this.enProceso=false;
  }
  registry(){
    this.router.navigate(['auth/registry']);
  }
  get f() { return this.loginForm.controls; }




  public registryForm(rol: string): void{

    switch(rol){
      case 'FARMER':this.title = "Agricultor"; this.image = 'assets/images/agricultor.jpg/'; break;
      case 'CLIENT': this.title = "Comprador"; this.image = 'assets/images/comprador.jpg/' ;break;
      case 'DRIVER': this.title = "Transportista"; break;
    }
    this.userType = rol;
    this.router.navigate(['auth/registry']);
  }
}
