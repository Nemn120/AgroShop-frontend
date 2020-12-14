import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UbigeoBean } from 'src/app/_model/UbigeoBean';
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
  destinationRegion: FormControl;
  destinationProvince: FormControl;
  destinationDistrict: FormControl;
  districtList:UbigeoBean[]=[];
  provinceList:UbigeoBean[]=[];
  regionList:UbigeoBean[]=[];
  regionCode:string;
  @Input() title: string;
  @Input() userType: string;
  constructor(private formBuilder: FormBuilder, private restService: RestService, private router: Router, private authService: AuthService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listarRegiones();
    this.destinationRegion= new FormControl(''),
    this.destinationProvince=new FormControl(''),
    this.destinationDistrict=new FormControl(''),
    this.driverForm = this.formBuilder.group({
      driverLicencia: new FormControl('', Validators.pattern('^[0-9]{10}$')),
      DNI: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8}$')]),
      Name: new FormControl('', [Validators.required] ),
      destinationRegion:this.destinationRegion,
      destinationProvince:this.destinationProvince,
      destinationDistrict:this.destinationDistrict,
      LastName: new FormControl('', [Validators.required]),
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
    newDriver.user.originRegion = this.driverForm.value.originRegion;
    newDriver.user.originProvince = this.driverForm.value.originProvince;
    newDriver.user.originDistrict = this.driverForm.value.originDistrict;
    newDriver.user.lastName = this.driverForm.value.LastName;
    newDriver.user.username = this.driverForm.value.UserName;
    newDriver.user.password = this.driverForm.value.Password;
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
            region: newDriver.user.originRegion,
            province: newDriver.user.originProvince,
            district: newDriver.user.originDistrict,
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
            region: newDriver.user.originRegion,
            province: newDriver.user.originProvince,
            district: newDriver.user.originDistrict,
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

  get f() { return this.driverForm.controls; }


  // dirección

  public listarRegiones() :Promise<any>{
    return new Promise((resolve,reject)=>{
      this.restService.requestApiRestData("ubigeo/grl", {}).subscribe((result: any) => {
        result.datalist.forEach(ubigeo=>{
          this.regionList.push(ubigeo)
        })
        resolve("success")
      }, error => {
        console.error(error);
      });
    });
  }

  public listarProvinciasSegunIdRegion(event: any) {
    this.destinationRegion=event.value.nombreUbigeo
    let params = {
      data: {
        codigoDepartamento: event.value.codigoDepartamento
      }
    }
    this.restService.requestApiRestData("ubigeo/gpbr", params).subscribe((result: any) => {
      this.regionCode = event.value.codigoDepartamento
      this.provinceList = result.datalist;
      this.districtList = [];
    }, error => {
      console.error(error);
    });
  }

  public listarDistritosSegunIdProvincia(event: any) {
    this.destinationProvince=event.value.nombreUbigeo
    let params = {
      data: {
        codigoProvincia: event.value.codigoProvincia,
        codigoDepartamento: this.regionCode
      }
    }
    this.restService.requestApiRestData("ubigeo/gdbpr", params).subscribe((result: any) => {
      this.districtList = result.datalist;
    }, error => {
      console.error(error);
    });
  }



}
