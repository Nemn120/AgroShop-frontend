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

import { DriverBean } from 'src/app/_model/DriverBean';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'status', 'actions'];
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
      console.log('messageChange: ',data);
      this.listProduct();
      this.restService.message(data.message, data.action);
    });

  }

  //list product all
  //this.restService.requestApiRestData('product/gap',param)

  //listProduct
  public listProduct() {

    let param = {
      data: {
        userCreateId:this.sharedService.userSession.id
      }
    }
    this.restService.requestApiRestData('product/glpbf', param)
      .subscribe(data => {
        console.log('mis productos! ', data);
        this.dataSource = new MatTableDataSource(data.datalist);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => {
        console.log("Error al listar productos!", error);
        this.restService.message('Error al listar productos!', 'Error');
      });
  }
    

  //newAndUpdateProduct
  newAndUpdateProduct(product?: ProductBean) {
    let productSelect = product != null ? product : new ProductBean();
    this.dialog.open(ProductFormComponent, {
      /*width: '30%',
      height: '50%',*/
      data: productSelect
    });
  }

newProduct(){

/*
    let param = {
      data: {
        name: "Coliflor",
        status: 'Desactivo',
        userCreateId: 1,
        category: {
          id: 1
        }
      }
    }

    let currentFileUpload: File = new File([""], "blanco");
    this.restService.requestApiRestData('product/sp', param, currentFileUpload).subscribe(result => {
    let param={
      data:1
    
      
    }
   
  
  let currentFileUpload:File = new File([""], "blanco");
    this.restService.requestApiRestData('product/sp',param,currentFileUpload).subscribe(result=>{
    //  this.restService.requestApiRestData('categoryproduct/gcp',{}).subscribe(result=>{  

      console.log(result);
      this.message('Producto agregado con exito!', 'Create');
      this.listProduct();
    },error => {
      console.log("Error al agregar producto! ", error);
      this.message('Error al agregar producto!', 'Error');
    });
*/
  }


  //deleteProduct
  deleteProduct(product: ProductBean) {

    let param = {
      data: {
        'id': product.id
      }
    }

    this.restService.requestApiRestData('product/dp', param).subscribe(data => {
      console.log('se elimino con exito!', data);
      this.restService.message('Producto eliminado con exito!', 'Delete');
      this.listProduct();

    },error => {
      console.log("Error al eliminar producto! ", error);
      this.restService.message('Error al eliminar producto!', 'Error');
    });

  }

  viewProduct(product: ProductBean){
    this.dialog.open(ProductViewComponent, {
     /* width: '30%',
      height: '50%',*/
      data: product
    });
  }

//searchProduct
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
