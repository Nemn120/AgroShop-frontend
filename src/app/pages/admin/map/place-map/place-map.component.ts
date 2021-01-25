import { Component, OnInit, Inject } from '@angular/core';
import { PlaceBean } from '../../../../_model/PlaceBean';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-place-map',
  templateUrl: './place-map.component.html',
  styleUrls: ['./place-map.component.scss']
})
export class PlaceMapComponent implements OnInit {

  positionMarker: number[] = [-77.0824914, -12.0587117];
  long: number = -77.0824914;
  lat: number = -12.0587117;
  name:string='No tiene ubicacion registrada';
  constructor(
    public dialogRef: MatDialogRef<PlaceMapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PlaceBean,
    
  ) { }

  ngOnInit(): void {

    console.log('place map: ',this.data);

    //If Place exits
    if(this.data && this.data.name!='no hay' && this.data.name!='desconocido'){
      this.long=this.data.longitude;
      this.lat=this.data.latitude;
      this.name=this.data.name;
      this.positionMarker = [this.long, this.lat];
    }

  }

}
