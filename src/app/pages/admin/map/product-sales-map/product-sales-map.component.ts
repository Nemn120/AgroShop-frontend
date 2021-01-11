
import { Component, OnInit, NgZone, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MapComponent } from 'ngx-mapbox-gl';
import { Marker } from 'mapbox-gl';
import { ProductSalesBean } from '../../../../_model/ProductSalesBean';
import { PlaceBean } from '../../../../_model/PlaceBean';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';

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
    private restService:RestService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {

    console.log('productSalesIn: ',this.data);

    
    //If Place exits
    //if(this.data.originPlace!=null){
      if(this.data.originPlace){
        this.long=this.data.originPlace.longitude;
        this.lat=this.data.originPlace.latitude;
        this.positionMarker = [this.long, this.lat];
    }
    
    
  }

  editPlace() {
    this.edit = true;
  }

  guardarPlace() {

    //let place:PlaceBean=new PlaceBean();
    //place.name='No definido';
    //place.longitude=this.long;
    //place.latitude=this.lat;

    //aqui llamar al servicio de guardado de place

    let productSales = new ProductSalesBean();

    productSales.id=this.data.id;
    productSales.userCreateId = this.sharedService.userSession.id;
    productSales.farmerNumber = this.sharedService.userSession.id;

    productSales.product = this.data.product;
    productSales.measureUnite = this.data.measureUnite;
    productSales.weight = this.data.weight;

    productSales.price = this.data.price;
    productSales.totalQuantity = this.data.totalQuantity;
    productSales.status = this.data.status;

    productSales.originPlace = new PlaceBean();
    
    if(this.data.originPlace){
      
      productSales.originPlace.id=this.data.originPlace.id;
      productSales.originPlace.name='conocido';
      productSales.originPlace.longitude=this.long;
      productSales.originPlace.latitude= this.lat;
    }else{
      productSales.originPlace.name='conocidox2';
      productSales.originPlace.longitude=this.long;
      productSales.originPlace.latitude= this.lat;
    }

    let param = {
      data: productSales,
    }
    
    this.restService.requestApiRestData('productsales/sps', param).subscribe(result => {

      console.log('result: ', result);

      //temporal validacion de producto nulo
      if (result.responseCode == "SUCCESS") {
        if (productSales.id) {
          this.restService.messageChange.next({ message: 'Producto Venta actualizado con exito!', action: "Update" });
        }
        else {
          this.restService.messageChange.next({ message: 'Producto Venta agregado con exito!', action: "Create" });
        }
      } else {
        this.restService.messageChange.next({ message: 'Seleccionar un producto!', action: "Info" });
      }

    }, error => {

      console.log("Error al agregar producto! ", error);
      this.restService.message('Error al agregar producto!', 'Error');

    });


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
