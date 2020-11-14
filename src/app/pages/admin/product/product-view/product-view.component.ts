import { Component, OnInit ,Inject} from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductBean } from '../../../../_model/ProductBean';
import { RestService } from '../../../../_service/rest.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  productSelect: ProductBean;

  imagenData: any;
  imagenEstado: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  labelFile: string;

  constructor(
    private restService: RestService,
    public dialogRef: MatDialogRef<ProductViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductBean,

    private sanitization: DomSanitizer,

  ) { }

  ngOnInit(): void {
    console.log('view: ',this.data);

    this.restService.getPhotoById(this.data.id).subscribe(data => {
      console.log('imagen: ',data);
      if (data.size > 0)
        this.imagenData = this.convertir(data);
    }, error => {
      console.log("Error al mostrar imagen! ", error);
      this.restService.message('Error al mostrar imagen!', 'Error');
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
