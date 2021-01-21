import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserBean } from 'src/app/_model/UserBean';
import { AuthService } from 'src/app/_service/auth.service';
import { RestService } from 'src/app/_service/rest.service';
import {DriverBean} from '../../../../_model/DriverBean';


@Component({
  selector: 'app-driver-form-container',
  templateUrl: './driver-form-container.component.html',
  styleUrls: ['./driver-form-container.component.scss']
})
export class DriverFormContainerComponent implements OnInit {
  hide = true;
  driverForm: FormGroup;
  pattern: any;
  @Input() title: string;
  @Input() userType: string;
  constructor(private formBuilder: FormBuilder, private restService: RestService, private router: Router, private authService: AuthService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.driverForm = this.formBuilder.group({
      driverLicencia: new FormControl('', Validators.pattern('^[0-9]{10}$')),
      DNI: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8}$')]),
      Name: new FormControl('', [Validators.required] ),
      LastName: new FormControl('', [Validators.required]),
      Email: new FormControl('',[Validators.required]),
      Phone: new FormControl('',[Validators.required, Validators.pattern('^[0-9]{9}$')]),
      UserName: new FormControl('', [Validators.required]),
      Password: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]]
    }, {
      validator: this.MatchPassword
    });
  }

  public MatchPassword(AC: AbstractControl) {
    const password = AC.get('Password').value;
    const confirmPassword = AC.get('ConfirmPassword').value;
    if (password != confirmPassword) {
        AC.get('ConfirmPassword').setErrors({ MatchPassword: true });
    } else {
        return null;
    }
}



  public register(): void {
    const newDriver = new DriverBean();
    newDriver.user = new UserBean();
    newDriver.driverLicenseNumber = this.driverForm.value.driverLicencia;
    newDriver.user.documentNumber = this.driverForm.value.DNI;
    newDriver.user.nombre = this.driverForm.value.Name;
    newDriver.user.lastName = this.driverForm.value.LastName;
    newDriver.user.username = this.driverForm.value.UserName;
    newDriver.user.password = this.driverForm.value.Password;
    newDriver.user.email = this.driverForm.value.Email;
    newDriver.user.cellPhone = this.driverForm.value.Phone;
    let param = new Object();
    if (this.userType == 'DRIVER') {
      param = {
        userType: this.userType,
        userRegister: {
          driverLicenseNumber: newDriver.driverLicenseNumber,
          user: {
            username: newDriver.user.username,
            password: newDriver.user.password,
            name: newDriver.user.nombre,
            lastName: newDriver.user.lastName,
            documentNumber: newDriver.user.documentNumber,
            email: newDriver.user.email,
            cellPhone: newDriver.user.cellPhone
          },
          status: 'Pendiente'
        }
     };
    } else {
      param = {
        userType: this.userType,
        userRegister: {

          user: {
            username: newDriver.user.username,
            password: newDriver.user.password,
            name: newDriver.user.nombre,
            lastName: newDriver.user.lastName,
            documentNumber: newDriver.user.documentNumber,
            email: newDriver.user.email,
            cellPhone: newDriver.user.cellPhone
          },

        }
     };
    }

    this.restService.requestApiRestData('user/rubt', param).subscribe(result => {
      this.matSnackBar.open(result.responseMessage, '', {
        duration: 2000
      });
      if (result.responseMessage == 'Registro completado con éxito') {
        setTimeout(() => {
          this.router.navigate(['auth/login']);
        }, 1500);
      }
    });
  }




}
