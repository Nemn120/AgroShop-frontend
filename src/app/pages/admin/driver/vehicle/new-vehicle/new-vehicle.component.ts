import { Component, OnInit } from '@angular/core';
import { VehicleEntity } from 'src/app/_model/VehicleEntity';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import { DriverBean } from 'src/app/_model/DriverBean';

@Component({
  selector: 'app-new-vehicle',
  templateUrl: './new-vehicle.component.html',
  styleUrls: ['./new-vehicle.component.scss']
})
export class NewVehicleComponent implements OnInit {

  vehicle : VehicleEntity;
  labelFile: string;
  selectedFiles: FileList;
  imagenData: any;
  currentFileUpload: File;
  IdSession : number;
  estados: string[] = ['Disponible','Malogrado','Ocupado'];

  constructor(
    private restService: RestService,
    private sharedData: SharedService
  ) { }

  ngOnInit(): void {
    this.vehicle = new VehicleEntity();
  }

  newVehicle(){
    this.IdSession = this.sharedData.userSession.id;
    this.vehicle.driver = new DriverBean();
    this.vehicle.driver.id = this.IdSession;
    if (this.selectedFiles != null) {
      this.currentFileUpload = this.selectedFiles.item(0);
    } else {
      this.currentFileUpload = new File([""], "blanco");
    }
    this.vehicle.photo = this.currentFileUpload;
    const param = {
      data : this.vehicle
    }
    this.restService.requestApiRestData('vehicle/sv',param,this.currentFileUpload).subscribe(result => {
      console.log(result);
    })
  }

  selectFile(e: any) {
    this.labelFile = e.target.files[0].name;
    this.selectedFiles = e.target.files;
  }

}
