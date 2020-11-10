
import { RestService } from 'src/app/_service/rest.service';

import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductBean } from '../../../../_model/ProductBean';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'status', 'actions'];
  dataSource: MatTableDataSource<ProductBean>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private restService: RestService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
    // Create 100 users
    //const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    //this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    /*this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;*/
  }

  ngOnInit() {
    /*this.productService.getListProductByOrganization().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }, error => {
      this.productService.mensajeCambio.next("Error al mostrar productos");
    });*/


    this.listProduct();

  }

  //list product all
  //this.restService.requestApiRestData('product/gap',param)

  //list product
  listProduct() {

    let param = {
      data: {
        userCreateId: 1
      }
    }
    this.restService.requestApiRestData('product/glpbf', param)
      .subscribe(data => {
        console.log('mis productos! ', data);
        this.dataSource = new MatTableDataSource(data.datalist);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => {
        console.log("Error al mostrar mis productos! ", error);
      });
  }
  //newProduct
  newProduct() {
    let param = {
      data: {

        name: "Coliflor",
        status:'Desactivo',

        userCreateId: 1,
        category: {
          id: 1
        }


      }
    }
    let currentFileUpload: File = new File([""], "blanco");
    this.restService.requestApiRestData('product/sp', param, currentFileUpload).subscribe(result => {
      console.log(result);
    })
  }


  openDialog(){

  }
  deleteProduct(product: ProductBean){

    let param={
      data: {
        'id':product.id
    }
    }
    
    this.restService.requestApiRestData('product/dp',param).subscribe(data => {
      console.log('se elimino con exito!',data);
      this.message('Producto eliminado con exito!','Delete');
     // this.router.navigate(['product/list']);
    })
  }

  message(message: string, action: string){
   
      this._snackBar.open(message, action, {
        duration: 2000,
      });
    
  }

  /*
  deleteProduct(product: ProductBean){
    let ms = new Message();
    ms.title='Borrar producto'; 
    ms.description = '¿Esta seguro de borrar el producto?';
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: ms
      }).afterClosed()
      .subscribe((confirmado: Boolean) => {
        if(confirmado){
          this.restService.requestApiRestData({id:product.id}).subscribe(data => {
            this.restService.getListProductByOrganization().subscribe(data => {
              this.productService.productCambio.next(data);
              this.productService.mensajeCambio.next("Se elimino con éxito");
            }, error => {
              console.error(error);
              this.productService.mensajeCambio.next("Error al mostrar listado de productos");
            });
          }, error => {
            console.error(error);
            this.productService.mensajeCambio.next("No eliminado");
          });
        }
      });
    
  }*/

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /*
    getProduct(){
  
      this.restService.requestApiRestData('categoryproduct/gcp',{}).subscribe(result=>{
        console.log(result);
      })
    }*/

}


/** Builds and returns a new User. */
/*
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}*/