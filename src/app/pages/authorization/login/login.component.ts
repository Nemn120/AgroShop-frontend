
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
    this.router.navigate(['auth/registry',rol]);
  }

}



