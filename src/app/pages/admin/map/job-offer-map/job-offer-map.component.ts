import { Component, OnInit , NgZone, Inject} from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MapComponent } from 'ngx-mapbox-gl';
import { Marker } from 'mapbox-gl';
import { ProductSalesBean } from '../../../../_model/ProductSalesBean';
import { PlaceBean } from '../../../../_model/PlaceBean';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import { MapService } from '../../../../_service/map.service';

@Component({
  selector: 'app-job-offer-map',
  templateUrl: './job-offer-map.component.html',
  styleUrls: ['./job-offer-map.component.scss']
})
export class JobOfferMapComponent implements OnInit {

  edit: boolean = false;

  positionMarker: number[] = [-77.0824914, -12.0587117];

  long: number = -77.0824914;
  lat: number = -12.0587117;
  name:string='No tiene ubicacion registrada';

  constructor(
    public dialogRef: MatDialogRef<JobOfferMapComponent>,
    private restService:RestService,
    private sharedService: SharedService,
    private mapService:MapService,
  ) { }

  ngOnInit(): void {

  }
  onDragEnd(marker: Marker) {
    NgZone.assertInAngularZone();
    this.long = marker.getLngLat().lng;
    this.lat = marker.getLngLat().lat;
    console.log(marker.getLngLat());
    this.findPlace(this.long, this.lat);
    
  }

  //GEOCODER
  onGeocoder(resultado: any) {
    this.long = resultado.result.geometry.coordinates[0];
    this.lat = resultado.result.geometry.coordinates[1];
    this.findPlace(this.long, this.lat);
    //this.updateMarker();
  }

  //GEOLOCATE
  onGeolocate(position: Position) {
    this.long = position.coords.longitude;
    this.lat = position.coords.latitude;  
    this.findPlace(this.long, this.lat);
   // this.updateMarker();
  }

   //BUSCAR EL LUGAR  APARTIR DE LAS COODENADAS
   findPlace(long: number, lat: number) {
    this.mapService.getPlace(long, lat).subscribe(
      data => {
        this.name=data.features[0].place_name;
        console.log('direccion: ',this.name);
      }) 
  }

  editPlace() {
    this.edit = true;
    this.positionMarker = [this.long, this.lat];
  }

  enviarPlace(){

    let originPlace = new PlaceBean();
    originPlace.name=this.name;
    originPlace.longitude=this.long;
    originPlace.latitude=this.lat;

    this.mapService.jobOfferPlaceChange.next(originPlace);

    this.restService.message('Ubicacion de la oferta seleccionada!',  "Select" );

    this.edit = false;
    this.close();
  }

  close() {
    this.dialogRef.close();
  }


}
