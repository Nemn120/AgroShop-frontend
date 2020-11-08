import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  driverForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private restService: RestService, private router: Router, private authService: AuthService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.driverForm = this.formBuilder.group({
      'driverLicencia': new FormControl(''),
      'driverDNI': new FormControl(''),
      'driverName': new FormControl(''),
      'driverLastName': new FormControl(''),
      'driverUserName': new FormControl(''),
      driverPassword: [''],
      driverConfirmPassword: ['']
    })
  }

  public register(): void{
    let newDriver = new DriverBean();
    newDriver.userAccount = new UserBean();
    newDriver.driverLicenseNumber = this.driverForm.value['driverLicencia'];
    newDriver.userAccount.documentNumber = this.driverForm.value['driverDNI'];
    newDriver.userAccount.nombre = this.driverForm.value['driverName'];
    newDriver.userAccount.lastName = this.driverForm.value['driverLastName'];
    newDriver.userAccount.username = this.driverForm.value['driverUserName'];
    newDriver.userAccount.password = this.driverForm.value['driverPassword'];
    let param = {
       userType: "DRIVER",
       userRegister:{
         user:{
           username:newDriver.userAccount.username,
           password:newDriver.userAccount.password
         }
       }
    }

    this.restService.requestApiRestData('user/rubt',param).subscribe(result => {
      this.matSnackBar.open(result.responseMessage, 'SUCCESS', {
        duration: 2000
      });
      setTimeout(() => {
        this.router.navigate(['auth/login']);
      }, 1500);
    });
  }

}
