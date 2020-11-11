import { Component, OnInit } from '@angular/core';
import { VehicleEntity } from 'src/app/_model/VehicleEntity';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service'

@Component({
  selector: 'app-new-vehicle',
  templateUrl: './new-vehicle.component.html',
  styleUrls: ['./new-vehicle.component.scss']
})
export class NewVehicleComponent implements OnInit {

  vehicle : VehicleEntity;
  idUser : number = 0;

  constructor(
    private restService: RestService,
    private sharedData: SharedService
  ) { }

  ngOnInit(): void {
    this.vehicle = new VehicleEntity();
    this.vehicle.id = this.sharedData.userSession.id;
  }

  newVehicle(){
    console.log(this.vehicle);
    const param = {
      data : this.vehicle
    }
    this.restService.requestApiRestData('vehicle/sv',param).subscribe(result => {
      console.log(result);
    })
  }

}
