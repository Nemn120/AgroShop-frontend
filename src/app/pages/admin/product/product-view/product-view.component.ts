import { Component, OnInit ,Inject} from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductBean } from '../../../../_model/ProductBean';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  productSelect: ProductBean;
  constructor(
    public dialogRef: MatDialogRef<ProductViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductBean,

  ) { }

  ngOnInit(): void {
    console.log('view: ',this.data);

  }


  closeDialog(): void {
    this.dialogRef.close();
  }

}
