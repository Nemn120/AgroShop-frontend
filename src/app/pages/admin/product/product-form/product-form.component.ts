import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductBean } from '../../../../_model/ProductBean';
import { RestService } from '../../../../_service/rest.service';
import { CategoryProductBean } from '../../../../_model/CategoryProductBean';
import { SharedService } from '../../../../_service/shared.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  selected = 'option2';
  titulo:string="Nuevo ";

  productSelect: ProductBean;
  categorias: CategoryProductBean[];
  estados: String[]=['Activo','Desactivo'];


  imagenData: any;
  imagenEstado: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  labelFile: string;

  constructor(
    private restService: RestService,
    private sharedService:SharedService,

    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductBean,

    private sanitization: DomSanitizer,

  ) { }


  ngOnInit(): void {
   
    this.listCategories();

    this.productSelect = new ProductBean();
    this.productSelect.userCreateId = this.sharedService.userSession.id;
    if (this.data.id > 0) {
      this.productSelect.id = this.data.id;
      this.productSelect.name = this.data.name;
      //this.productSelect.status = this.data.status;
      this.productSelect.description = this.data.description;
      this.productSelect.category = this.data.category;

      this.restService.getPhotoById(this.data.id).subscribe(data => {
        if (data.size > 0)
          this.imagenData = this.convertir(data);
      }, error => {
        this.restService.message('Error al mostrar imagen!', 'Error');
      });
      this.titulo="Actualizar ";
    }


  }
  save() {

    let param = {
      data: this.productSelect,
    }

    if (this.selectedFiles != null) {
      this.currentFileUpload = this.selectedFiles.item(0);
    } else {
      this.currentFileUpload = new File([""], "blanco");
    }
    this.restService.requestApiRestData('product/sp', param, this.currentFileUpload).subscribe(result => {
      if (this.productSelect.id) {
        this.restService.messageChange.next({ message: 'Producto actualizado con exito!', action: "Update" });
      }
      else {
        this.restService.messageChange.next({ message: 'Producto agregado con exito!', action: "Create" });
      }

    }, error => {
      this.restService.message('Error al agregar producto!', 'Error');
    });
    this.closeDialog();
  }


  listCategories() {
    let param = {
      data: {
        userCreateId: 1
      }
    }
    this.restService.requestApiRestData('categoryproduct/gcp', param).subscribe(data => {
      console.log('categorias: ', data);
      this.categorias = data.datalist;
    });
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  selectFile(e: any) {
    this.labelFile = e.target.files[0].name;
    this.selectedFiles = e.target.files;

  }

  public convertir(data: any) {
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      let base64 = reader.result;
      this.sanar(base64);
    }
  }

  public sanar(base64: any) {
    this.imagenData = this.sanitization.bypassSecurityTrustResourceUrl(base64);
    this.imagenEstado = true;
  }

}
