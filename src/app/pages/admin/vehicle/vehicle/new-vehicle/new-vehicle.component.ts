import { Component, OnInit } from '@angular/core';
import { VehicleEntity } from 'src/app/_model/VehicleEntity';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import { DriverBean } from 'src/app/_model/DriverBean';
import Swal from 'sweetalert2';

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
  status: string[] = ['Disponible','Malogrado','Ocupado'];
  fuel: string[] = ['Gasolina 98','Gasolina 95','Gas natural','Diesel','Bioetanol'];
  selectedStatus: string = 'Disponible';
  
  constructor(
    private restService: RestService,
    private sharedData: SharedService,
  ) { }

  ngOnInit(): void {
    console.log("selectedStatus: ", this.selectedStatus)
    this.vehicle = new VehicleEntity();
  }

  newVehicle(){
    Swal.fire({
      title: '¿Registrar vehiculo?',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Registrar vehiculo'
    }).then((result) => {
      if (result.isConfirmed) {
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
          this.restService.messageChange.next({ message: 'Vehiculo agregado con exito!', action: "Create" });
    })
      }
    });
  }

  selectFile(e: any) {
    this.labelFile = e.target.files[0].name;
    this.selectedFiles = e.target.files;
  }

}
