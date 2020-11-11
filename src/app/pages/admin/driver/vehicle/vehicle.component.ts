import { Component, OnInit } from '@angular/core';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewVehicleComponent } from './new-vehicle/new-vehicle.component';
import { RestService } from 'src/app/_service/rest.service';
import { AuthService } from 'src/app/_service/auth.service'
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { VehicleEntity } from 'src/app/_model/VehicleEntity';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  idUser : number = 0;
  vehicle : VehicleEntity;

  constructor(
    public dialog: MatDialog,
    private restService: RestService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    //this.authService.login('condori','sirundercover1');
  }

  getVehicleListByAccount(){
  }

  moreDetails(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.minHeight = "40%";
    dialogConfig.minWidth = "370px";
    this.dialog.open(VehicleDetailComponent, dialogConfig);
  }

  newVehicle(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.minHeight = "40%";
    dialogConfig.minWidth = "370px";
    this.dialog.open(NewVehicleComponent, dialogConfig);
  }

}
