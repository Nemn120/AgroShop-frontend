import {Component,OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { RestService } from 'src/app/_service/rest.service';
import { ProductBean } from '../../../../_model/ProductBean';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductViewComponent } from '../product-view/product-view.component';
import { SharedService } from 'src/app/_service/shared.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource: MatTableDataSource<ProductBean>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private restService: RestService,
    public dialog: MatDialog,
    private sharedService:SharedService
 
  ) {}

  ngOnInit() {
   
    this.listProduct();


    this.restService.messageChange.subscribe(data => {
      this.listProduct();
      this.restService.message(data.message, data.action);
    });

  }

  public listProduct() {

    let param = {
      data: {
        userCreateId:this.sharedService.userSession.id
      }
    }
    this.restService.requestApiRestData('product/glpbf', param)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data.datalist);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => {
        this.restService.message('Error al listar productos!', 'Error');
      });
  }
    

  //new and update product
  newAndUpdateProduct(product?: ProductBean) {
    let productSelect = product != null ? product : new ProductBean();
    this.dialog.open(ProductFormComponent, {
      /*width: '30%',
      height: '50%',*/
      data: productSelect
    });
  }

  //delete product
  deleteProduct(product: ProductBean) {

    let param = {
      data: {
        'id': product.id
      }
    }

    this.restService.requestApiRestData('product/dp', param).subscribe(data => {
      this.restService.message('Producto eliminado con exito!', 'Delete');
      this.listProduct();

    },error => {
      this.restService.message('Error al eliminar producto!', 'Error');
    });

  }

  //view product
  viewProduct(product: ProductBean){
    this.dialog.open(ProductViewComponent, {
      //width: '30%',
      //height: '50%',
      data: product
    });
  }

//search product
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
