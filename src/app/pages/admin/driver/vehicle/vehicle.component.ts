import { Component, OnInit } from '@angular/core';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewVehicleComponent } from './new-vehicle/new-vehicle.component';
import { RestService } from 'src/app/_service/rest.service';
import { VehicleEntity } from 'src/app/_model/VehicleEntity';
import { SharedService } from 'src/app/_service/shared.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  idUser : number = 0;
  vehicle : VehicleEntity;
  cars : any[];
  imagenData : any;
  imagenEstado: boolean = false;

  constructor(
    public dialog: MatDialog,
    private restService: RestService,
    private sharedService : SharedService,
    private sanitization: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.idUser = this.sharedService.userSession.id;
    let param = {
      data:{
        driver:{
          id : this.idUser
        }
      }
    }
    this.restService.requestApiRestData('vehicle/gvlbd',param).subscribe(result =>{
      this.cars = result.datalist;
      //this.imagenData = this.convertir(result);
      console.log(result);
    })
  }

  moreDetails(vehicleDetail : VehicleEntity){
    let vehicleSelect = vehicleDetail != null ? vehicleDetail : new VehicleEntity();
    this.dialog.open(VehicleDetailComponent, {
      data: vehicleSelect,
      width :'60%',
      minHeight : "40%",
      minWidth : "370px",
      autoFocus :  true
    });
  }

  newVehicle(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.minHeight = "40%";
    dialogConfig.minWidth = "370px";
    this.dialog.open(NewVehicleComponent, dialogConfig);
  }

  public convertir(data: any) {
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      let base64 = reader.result;      
      this.sanar(base64);
    }
  }

  public sanar(base64 : any){
    this.imagenData= this.sanitization.bypassSecurityTrustResourceUrl(base64);
  }
}
