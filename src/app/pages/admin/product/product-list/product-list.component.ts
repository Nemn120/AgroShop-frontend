
import { RestService } from 'src/app/_service/rest.service';

import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private restService:RestService,

  ) { 
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(){
    /*this.productService.getListProductByOrganization().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }, error => {
      this.productService.mensajeCambio.next("Error al mostrar productos");
    });*/

    
    this.listProduct();
    this.listAllProducts();
  }

//list product
listAllProducts(){

  let param={
    data:{
     
    }
  }
  this.restService.requestApiRestData('product/gap',param)
  .subscribe(data => {
    console.log('productos! ',data);
  }, error => {
    console.log("Error al mostrar productos! ",error);
  });
    }


//list product
  listProduct(){

let param={
  data:{
    userCreateId :1
  }
}
this.restService.requestApiRestData('product/glpbf',param)
.subscribe(data => {
  console.log('mis productos! ',data);
}, error => {
  console.log("Error al mostrar mis productos! ",error);
});
  }
//newProduct
  newProduct(){
    let param={
      data:{
        
          name:"Caña",
         
          userCreateId:1,
          category:{
id:1
          }
          
          
      }
  }
  let currentFileUpload:File = new File([""], "blanco");
    this.restService.requestApiRestData('product/sp',param,currentFileUpload).subscribe(result=>{
      console.log(result);
    })
  }







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
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}