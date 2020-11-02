import { Component, OnInit } from '@angular/core';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewVehicleComponent } from './new-vehicle/new-vehicle.component';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  moreDetails(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.minHeight = "40%";
    this.dialog.open(VehicleDetailComponent, dialogConfig);
  }

  newVehicle(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.minHeight = "40%";
    this.dialog.open(NewVehicleComponent, dialogConfig);
  }

}
