import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VehicleEntity } from 'src/app/_model/VehicleEntity';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {

  idUser : number;

  constructor(
    private restService: RestService,
    private sharedService : SharedService,
    @Inject(MAT_DIALOG_DATA) public data: VehicleEntity,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  public setColorStatus(status : string):string{
    switch(status){
      case 'Disponible': return '#0B8F48';
      case 'Malogrado' : return '#CD6804';
      case 'Ocupado' : return '055387';
      default : return '#ffffff';
    }
  }

}
