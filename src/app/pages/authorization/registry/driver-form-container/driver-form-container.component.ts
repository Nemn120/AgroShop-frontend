import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  @Input() title: string;
  @Input() userType: string;
  constructor(private formBuilder: FormBuilder, private restService: RestService, private router: Router, private authService: AuthService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.driverForm = this.formBuilder.group({
      'driverLicencia': new FormControl('', [Validators.required]),
      'DNI': new FormControl('', [Validators.required]),
      'Name': new FormControl('', [Validators.required]),
      'LastName': new FormControl('', [Validators.required]),
      'UserName': new FormControl('', [Validators.required]),
      Password: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]]
    })
  }



  public register(): void{
    let newDriver = new DriverBean();
    newDriver.user = new UserBean();
    newDriver.driverLicenseNumber = this.driverForm.value['driverLicencia'];
    newDriver.user.documentNumber = this.driverForm.value['DNI'];
    newDriver.user.nombre = this.driverForm.value['Name'];
    newDriver.user.lastName = this.driverForm.value['LastName'];
    newDriver.user.username = this.driverForm.value['UserName'];
    newDriver.user.password = this.driverForm.value['Password'];
    let param = {
       userType: this.userType,
       userRegister:{
         user:{
           username:newDriver.user.username,
           password:newDriver.user.password
         }
       }
    }

    this.restService.requestApiRestData('user/rubt',param).subscribe(result => {
      this.matSnackBar.open(result.responseMessage, '', {
        duration: 2000
      });
      setTimeout(() => {
        this.router.navigate(['auth/login']);
      }, 1500);
    });
  }

}
