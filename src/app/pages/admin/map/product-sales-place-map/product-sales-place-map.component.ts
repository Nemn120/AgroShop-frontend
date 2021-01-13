import { Component, OnInit,Inject } from '@angular/core';
import { ProductSalesBean } from '../../../../_model/ProductSalesBean';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-sales-place-map',
  templateUrl: './product-sales-place-map.component.html',
  styleUrls: ['./product-sales-place-map.component.scss']
})
export class ProductSalesPlaceMapComponent implements OnInit {

  positionMarker: number[] = [-77.0824914, -12.0587117];
  long: number = -77.0824914;
  lat: number = -12.0587117;
  name:string='No tiene ubicacion registrada';
  constructor(
    public dialogRef: MatDialogRef<ProductSalesPlaceMapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductSalesBean,
    
  ) { }

  ngOnInit(): void {

    console.log('productSalesIn: ',this.data);

    //If Place exits
    if(this.data.originPlace){
      this.long=this.data.originPlace.longitude;
      this.lat=this.data.originPlace.latitude;
      this.name=this.data.originPlace.name;
      this.positionMarker = [this.long, this.lat];
    }

  }

}
