
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserBean } from 'src/app/_model/UserBean';
import { AuthService } from 'src/app/_service/auth.service';
import { RestService } from 'src/app/_service/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  username: string;
  password: string;
  enProceso = false;

  // PARA REGISTRO
  title: string;
  userType: string;
  image: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private snack: MatSnackBar,
    private fb: FormBuilder,
    private restService: RestService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // falta validar credenciales incorrectos(back)
  login() {

    if (this.loginForm.invalid) {
      return;
    }
    this.enProceso = true;
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    this.isDriverAccepted(this.username);
    this.authService.login(this.username, this.password);

    this.enProceso = false;
  }
  registry() {
    this.router.navigate(['auth/registry']);
  }
  get f() { return this.loginForm.controls; }

  public registryForm(rol: string): void {
    this.router.navigate(['auth/registry', rol]);
  }

   public isDriverAccepted(username: string) {

    const user: UserBean = new UserBean();
    user.username = username;

    const u = {
      data: user
    };

    const param = {
      data: username
    };

    this.restService.requestApiRestData('user/gubus', u)
      .subscribe( dto => {
        if (dto.data.typeUser === 'DRIVER') {
          this.restService.requestApiRestData('driver/gmfd', param)
          .subscribe( result => {
              if (result.data) {
                Swal.fire({
                  title: 'Important',
                  text: result.data,
                  icon: 'warning',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'Ok'
                });
              }
            }
          );
        }
      });
  }
}



