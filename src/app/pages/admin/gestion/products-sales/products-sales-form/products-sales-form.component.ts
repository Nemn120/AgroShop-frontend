import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductSalesBean } from 'src/app/_model/ProductSalesBean';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import { ProductBean } from '../../../../../_model/ProductBean';

@Component({
  selector: 'app-products-sales-form',
  templateUrl: './products-sales-form.component.html',
  styleUrls: ['./products-sales-form.component.scss']
})
export class ProductsSalesFormComponent implements OnInit {

  titulo: string = "Nuevo ";

  productSalesSelect: ProductSalesBean;
  productos: ProductBean[];
  estados: String[] = ['Activo', 'Desactivo'];

  constructor(
    private restService: RestService,
    private sharedService: SharedService,

    public dialogRef: MatDialogRef<ProductsSalesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductSalesBean,
  ) { }


  ngOnInit(): void {

    this.listProduct();

    this.productSalesSelect = new ProductSalesBean();
    this.productSalesSelect.userCreateId = this.sharedService.userSession.id;
    this.productSalesSelect.farmerNumber = this.sharedService.userSession.id;
    this.productSalesSelect.price = 0;
    this.productSalesSelect.totalQuantity = 0;
    console.log('this.productSalesSelect: ', this.productSalesSelect);
    if (this.data.id > 0) {
      this.productSalesSelect.id = this.data.id;
      this.productSalesSelect.product = this.data.product;
      this.productSalesSelect.measureUnite = this.data.measureUnite;
      this.productSalesSelect.weight = this.data.weight;

      this.productSalesSelect.price = this.data.price;
      this.productSalesSelect.totalQuantity = this.data.totalQuantity;
      this.productSalesSelect.status = this.data.status;

      this.titulo = "Actualizar ";
    }

  }

  save() {

    if (!this.productSalesSelect.price) {
      this.productSalesSelect.price = 0;
    }
    if (!this.productSalesSelect.totalQuantity) {
      this.productSalesSelect.totalQuantity = 0;
    }
    
    //PRODUCTO UN BUSCADOR
    //temporal validacion de producto nulo
    if (!this.productSalesSelect.product) {
      this.productSalesSelect.product = new ProductBean();
    }

    let param = {
      data: this.productSalesSelect,
    }

    this.restService.requestApiRestData('productsales/sps', param).subscribe(result => {

      console.log('result: ', result);

      //temporal validacion de producto nulo
      if (result.responseCode == "SUCCESS") {
        if (this.productSalesSelect.id) {
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
    this.closeDialog();
  }

  //list products
  listProduct() {

    let param = {
      data: {
        userCreateId: this.sharedService.userSession.id
      }
    }
    this.restService.requestApiRestData('product/glpbf', param)
      .subscribe(data => {
        console.log('mis productos! ', data);
        this.productos = data.datalist;
      }, error => {
        console.log("Error al listar productos!", error);
        this.restService.message('Error al listar productos!', 'Error');
      });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

}
