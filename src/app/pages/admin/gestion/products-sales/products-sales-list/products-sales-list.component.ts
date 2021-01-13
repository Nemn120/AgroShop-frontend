import { ProductsSalesViewComponent } from './../products-sales-view/products-sales-view.component';
import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/_service/shared.service';
import { RestService } from 'src/app/_service/rest.service';
import { ProductSalesBean } from '../../../../../_model/ProductSalesBean';
import { ProductsSalesFormComponent } from '../products-sales-form/products-sales-form.component';
import { ProductSalesMapComponent } from '../../../map/product-sales-map/product-sales-map.component';

@Component({
  selector: 'app-products-sales-list',
  templateUrl: './products-sales-list.component.html',
  styleUrls: ['./products-sales-list.component.scss']
})
export class ProductsSalesListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'product','price','unit','totalQuantity','availableQuantity', 'statusSales', 'status','actions'];
  dataSource: MatTableDataSource<ProductSalesBean>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //isName:boolean=false;

  constructor(
    private sharedService:SharedService,
    private restService: RestService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.listProductSales();

    this.restService.messageChange.subscribe(data => {
      console.log('messageChange: ',data);
      this.listProductSales();
      this.restService.message(data.message, data.action);
    });

  }


  //list products sales
  public listProductSales() {

    let param = {
      data: {
        farmerNumber:this.sharedService.userSession.id,
        //userCreateId:this.sharedService.userSession.id
      }
    }
    this.restService.requestApiRestData('productsales/glpsbf', param)
      .subscribe(data => {
        console.log('mis productos venta! ', data);
        this.dataSource = new MatTableDataSource(data.datalist);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => {
        console.log("Error al listar productos venta!", error);
        this.restService.message('Error al listar productos venta!', 'Error');
      });
  }

    //new and update product sales
    newAndUpdateProductSales(productSales?: ProductSalesBean) {
      let productSalesSelect = productSales != null ? productSales : new ProductSalesBean();
      this.dialog.open(ProductsSalesFormComponent, {
        data: productSalesSelect
      });
    }


  //view product sales
  viewProductSales(productSales: ProductSalesBean){
    this.dialog.open(ProductsSalesViewComponent, {
      data: productSales
    });
  }

  //delete product sales
  deleteProductSales(productSales: ProductSalesBean) {

    let param = {
      data: {
        'id': productSales.id
      }
    }

    this.restService.requestApiRestData('productsales/dps', param).subscribe(data => {
      console.log('se elimino con exito!', data);
      this.restService.message('Producto venta eliminado con exito!', 'Delete');
      this.listProductSales();

    },error => {
      console.log("Error al eliminar producto venta! ", error);
      this.restService.message('Error al eliminar producto venta!', 'Error');
    });

  }
  
  //search product sales
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


   //open map product sales
   openProductSalesMap(ProductSales: ProductSalesBean){
    this.dialog.open(ProductSalesMapComponent, {
      width: '50%',
      height: '70%',
      data: ProductSales,
    });
  }

}
