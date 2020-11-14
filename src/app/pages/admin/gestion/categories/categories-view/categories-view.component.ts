import { Component, OnInit,Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { RestService } from '../../../../../_service/rest.service';
import { ProductViewComponent } from '../../../product/product-view/product-view.component';
import { CategoryProductBean } from './../../../../../_model/CategoryProductBean';

@Component({
  selector: 'app-categories-view',
  templateUrl: './categories-view.component.html',
  styleUrls: ['./categories-view.component.scss']
})
export class CategoriesViewComponent implements OnInit {

  categorySelect: CategoryProductBean;

  imagenData: any;
  imagenEstado: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  labelFile: string;

  constructor(
    public dialogRef: MatDialogRef<ProductViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryProductBean,
  ) { }

  ngOnInit(): void {
    console.log('view: ',this.data);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


}
