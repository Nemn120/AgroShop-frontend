
import { Component, OnInit, NgZone, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MapComponent } from 'ngx-mapbox-gl';
import { Marker } from 'mapbox-gl';
import { ProductSalesBean } from '../../../../_model/ProductSalesBean';

@Component({
  selector: 'app-product-sales-map',
  templateUrl: './product-sales-map.component.html',
  styleUrls: ['./product-sales-map.component.scss']
})
export class ProductSalesMapComponent implements OnInit {

  edit: boolean = false;

  positionMarker: number[] = [-77.0824914, -12.0587117];

  long: number = -77.0824914;
  lat: number = -12.0587117;

  constructor(
    public dialogRef: MatDialogRef<MapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductSalesBean,
  ) { }

  ngOnInit(): void {

    console.log('productSalesIn: ',this.data);
  }

  editPlace() {
    this.edit = true;
  }

  guardarPlace() {


    this.edit = false;
    this.close();
  }


  onDragEnd(marker: Marker) {
    NgZone.assertInAngularZone();
    this.long = marker.getLngLat().lng;
    this.lat = marker.getLngLat().lat;
    console.log(marker.getLngLat());
  }

  close() {
    this.dialogRef.close();
  }

}
