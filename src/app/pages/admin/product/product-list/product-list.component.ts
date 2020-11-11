import { Component, OnInit } from '@angular/core';
import { DriverBean } from 'src/app/_model/DriverBean';
import { AuthService } from 'src/app/_service/auth.service';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  constructor(
    private restService:RestService,
    private authService:AuthService,
    private sharedData:SharedService
  ) { }

  ngOnInit(): void {
    console.log("LIST");
  }

  getProduct(){
    let vehicleBean: any;
    //vehicleBean.... // TODOS LOS DATOS RESTANTES SIN LA FOTO
    vehicleBean.driver=new DriverBean();
    vehicleBean.driver.id=this.sharedData.userSession.id // ID DEL CONDUCTOR , ID DEL CLIENTE

    let param={
      data:vehicleBean
    
      
    }
    let param={
      data:{
        driver:{
          id:id
        }
        
      }
    }
  
  let currentFileUpload:File = new File([""], "blanco");
    this.restService.requestApiRestData('product/sp',param,currentFileUpload).subscribe(result=>{
    //  this.restService.requestApiRestData('categoryproduct/gcp',{}).subscribe(result=>{  

      console.log(result);
    })
  }

}
