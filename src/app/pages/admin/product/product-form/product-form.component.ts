import { Component, OnInit ,Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductBean } from '../../../../_model/ProductBean';
import { RestService } from '../../../../_service/rest.service';

import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  constructor(
    private restService:RestService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductBean,

    ) {}

 
  ngOnInit(): void {
  }
  save(){
    let param = {
      data: {
        name: "Fresa",
        status: 'Desactivo',
        userCreateId: 1,
        category: {
          id: 1
        }
      }
    }

    let currentFileUpload: File = new File([""], "blanco");
    this.restService.requestApiRestData('product/sp', param, currentFileUpload).subscribe(result => {
      console.log(result);
      this.message('Producto agregado con exito!', 'Create');
      
    },error => {
      console.log("Error al agregar producto! ", error);
      this.message('Error al agregar producto!', 'Error');
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  
  //messages
  message(message: string, action: string) {

    this._snackBar.open(message, action, {
      duration: 2000,
    });

  }
}
