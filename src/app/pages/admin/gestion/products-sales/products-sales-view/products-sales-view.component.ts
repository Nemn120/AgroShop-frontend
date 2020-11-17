import { Component, OnInit,Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CategoryProductBean } from 'src/app/_model/CategoryProductBean';
import { ProductSalesBean } from 'src/app/_model/ProductSalesBean';

@Component({
  selector: 'app-products-sales-view',
  templateUrl: './products-sales-view.component.html',
  styleUrls: ['./products-sales-view.component.scss']
})
export class ProductsSalesViewComponent implements OnInit {

  productSalesSelect: ProductSalesBean;

  constructor(
    public dialogRef: MatDialogRef<ProductsSalesViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductSalesBean,
  ) { }

  ngOnInit(): void {
    
    console.log('view: ',this.data);
 
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
