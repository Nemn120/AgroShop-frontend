import { Component, OnInit ,Inject} from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/_service/shared.service';
import { ProductSalesBean } from '../../../../_model/ProductSalesBean';

@Component({
  selector: 'app-view-products-sales-map',
  templateUrl: './view-products-sales-map.component.html',
  styleUrls: ['./view-products-sales-map.component.scss']
})
export class ViewProductsSalesMapComponent implements OnInit {

  
  lista: ProductSalesBean[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductSalesBean[],
    private router : Router,
    private dialogMap: MatDialogRef<ViewProductsSalesMapComponent>,
  ) { }

  ngOnInit() {
    //FILTRADO DE UBICACIONES
    for (let i of this.data) {
      if (i.originPlace!= null) {
        this.lista.push(i);
      }
    }
    console.log(this.lista);
  }

  redirectToCompany(idCompany:number){
    /*this.router.navigate(['/index/shop',idCompany]);*/
    this.dialogMap.close();
  } 
  
  closeMap() {
    this.dialogMap.close();
  }
 
}
