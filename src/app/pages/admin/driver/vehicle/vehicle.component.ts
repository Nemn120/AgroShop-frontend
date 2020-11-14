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
      console.log(param);
      this.convertir(result.datalist);
      this.cars = result.datalist;
    })
  }

  moreDetails(vehicleDetail : VehicleEntity){
    let vehicleSelect = vehicleDetail != null ? vehicleDetail : new VehicleEntity();
    this.dialog.open(VehicleDetailComponent, {
      data: vehicleSelect,
      width :'50%',
      minHeight : "40%",
      minWidth : "400px"
    });
  }

  newVehicle(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.minHeight = "40%";
    dialogConfig.minWidth = "370px";
    this.dialog.open(NewVehicleComponent, dialogConfig);
  }

  public convertir(data: any) {
    for(const m of data){
      this.restService.getPhoto(m.id).subscribe(photo =>{
        let reader = new FileReader();
          reader.readAsDataURL(photo);
          reader.onloadend = () => {
          const base64 = reader.result;
          m.photo = this.sanar(base64);
        }
      })
    }
  }

  public sanar(data : any){
    return this.sanitization.bypassSecurityTrustResourceUrl(data);
  }

  public setColorStatus(status : string):string{
    switch(status){
      case 'Disponible': return '#0B8F48';
      case 'Malogrado' : return '#CD6804';
      case 'Ocupado' : return '#055387';
      default : return '#000000';
    }
  }
}
