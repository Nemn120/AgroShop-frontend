import { Component, Inject, OnInit } from '@angular/core';
import { VehicleEntity } from 'src/app/_model/VehicleEntity';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import { DriverBean } from 'src/app/_model/DriverBean';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  vehicleSelect: VehicleEntity;
  IdSession : number;
  status: string[] = ['Disponible','Malogrado','Ocupado'];
  fuel: string[] = ['Gasolina 98','Gasolina 95','Gas natural','Diesel','Bioetanol'];
  selectedStatus: string = 'Disponible';
  titleS: string;
  confirmButtonTextS: string;
  messageS: string;
  actionS: string;
  button: string;

  constructor(
    private restService: RestService,
    private sharedData: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: VehicleEntity
  ) { }

  ngOnInit(): void {
    console.log("selectedStatus: ", this.selectedStatus)
    this.vehicle = new VehicleEntity();
    this.vehicleSelect = new VehicleEntity();
    if(this.data.id>0){
      this.vehicle.id = this.data.id;
      this.vehicle.plateNumber = this.data.plateNumber;
      this.vehicle.serialNumber = this.data.serialNumber;
      this.vehicle.vehicleBrand = this.data.vehicleBrand;
      this.vehicle.vehicleModel = this.data.vehicleModel;
      this.vehicle.yearsOfUse = this.data.yearsOfUse;
      this.vehicle.fuelType = this.data.fuelType;
      this.vehicle.statusCar = this.data.statusCar;
      this.vehicle.grossWeight = this.data.grossWeight;
      this.vehicle.netWeight = this.data.netWeight;
      this.button = 'Modificar';
    }
    else{
      this.button = 'Ingresar';
    }
    console.log(this.data);
  }

  newVehicle(){
    if(this.data.id>0){
      this.titleS = '¿Modificar vehiculo?';
      this.confirmButtonTextS = 'Modificar vehiculo';
      this.messageS = 'Vehiculo modificado con exito!';
      this.actionS = 'Modify';
    }
    else{
      this.titleS = '¿Registrar vehiculo?';
      this.confirmButtonTextS = 'Registrar vehiculo';
      this.messageS = 'Vehiculo agregado con exito!';
      this.actionS = 'Create';
    }

      Swal.fire({
        title: this.titleS,
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
        confirmButtonText: this.confirmButtonTextS
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
            this.restService.messageChange.next({ message: this.messageS, action: this.actionS });
      })
        }
      });
    }
    
  

  selectFile(e: any) {
    this.labelFile = e.target.files[0].name;
    this.selectedFiles = e.target.files;
  }

}
