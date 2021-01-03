import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UbigeoBean } from 'src/app/_model/UbigeoBean';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import { SearchOrderByFieldsDTO } from '../../../../_DTO/SearchOrderByFieldsDTO';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OrderBean } from 'src/app/_model/OrderBean';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import {ExporterService} from '../../../../_service/exporter.service';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.scss']
})
export class OrderSearchComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['status','address','reference','date','phone','quantity','total','destination','order'];
  districtList:UbigeoBean[]=[];
  provinceList:UbigeoBean[]=[];
  regionList:UbigeoBean[]=[];
  regionCode:string;
  searchOrderByFieldsDTO:SearchOrderByFieldsDTO;
  dataSource: MatTableDataSource<any>;
  statusList: any[] = ['Todos', 'Publicada', 'Pendiente','Cancelado'];
  allString: string = 'Todos';

  constructor(
    private restService: RestService, private sharedService: SharedService, public dialog: MatDialog,
    private excelService: ExporterService
  ) { }

  ngOnInit(): void {
    this.searchOrderByFieldsDTO = new SearchOrderByFieldsDTO();
    this.getAsignOrderByFields();
    this.listarRegiones();
  }

  public getAsignOrderByFields(){
    if (this.searchOrderByFieldsDTO.status == 'Todos')
      this.searchOrderByFieldsDTO.status = undefined;

    if(this.searchOrderByFieldsDTO.destinationDistrict == 'Todos')
      this.searchOrderByFieldsDTO.destinationDistrict = undefined;

    if(this.searchOrderByFieldsDTO.priceIni == null)
      this.searchOrderByFieldsDTO.priceFin = undefined;
    
    if(this.searchOrderByFieldsDTO.destinationRegion == undefined && (this.searchOrderByFieldsDTO.destinationProvince != undefined || this.searchOrderByFieldsDTO.destinationProvince != undefined)){
      this.searchOrderByFieldsDTO.destinationProvince == undefined;
      this.searchOrderByFieldsDTO.destinationDistrict == undefined;
    }

    if(this.searchOrderByFieldsDTO.priceIni>this.searchOrderByFieldsDTO.priceFin){
      this.restService.messageChange.next({ message: 'Rango equivocado', action: "Fail" });
    }
    else{
      this.searchOrderByFieldsDTO.farmer = this.sharedService.userSession.id;
      let param = {
        data : this.searchOrderByFieldsDTO
      }
      this.restService.requestApiRestData('order/globf',param).subscribe(result =>{
        this.dataSource = new MatTableDataSource(result.datalist);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }
  }

  public setColorStatus(status : string):string{
    switch(status){
      case 'Publicada': return '#009865';
      case 'Pendiente': return '#F26A24';
      case 'Cancelado': return '#E3BB6A';
    }
  }

  public openDetails(order: OrderBean) {
    let ord = order != null ? order : new OrderBean();
    this.dialog.open(OrderDetailsComponent, {
      width: '500px',
      data: ord,
      autoFocus: false
    });
  }

  public listarRegiones() :Promise<any>{
    return new Promise((resolve,reject)=>{
      this.restService.requestApiRestData("ubigeo/grl", {}).subscribe((result: any) => {
        result.datalist.forEach(ubigeo=>{
          this.regionList.push(ubigeo);
        })
        resolve("success")
      }, error => {
        console.error(error);
      });
    });
  }

  public listarProvinciasSegunIdRegion(event: any) {
    this.searchOrderByFieldsDTO.destinationProvince = undefined;
    this.searchOrderByFieldsDTO.destinationRegion=event.value.nombreUbigeo;
    let params = {
      data: {
        codigoDepartamento: event.value.codigoDepartamento
      }
    }
    this.restService.requestApiRestData("ubigeo/gpbr", params).subscribe((result: any) => {
      this.regionCode = event.value.codigoDepartamento
      this.provinceList = result.datalist;
      this.districtList = [];
    }, error => {
      console.error(error);
    });
  }

  public listarDistritosSegunIdProvincia(event: any) {
    this.searchOrderByFieldsDTO.destinationDistrict  = undefined;
    this.searchOrderByFieldsDTO.destinationProvince=event.value.nombreUbigeo
    let params = {
      data: {
        codigoProvincia: event.value.codigoProvincia,
        codigoDepartamento: this.regionCode
      }
    }
    this.restService.requestApiRestData("ubigeo/gdbpr", params).subscribe((result: any) => {
      this.districtList = result.datalist;
    }, error => {
      console.error(error);
    });

  }

  public exportAsXLSXFiltered():void{
    this.excelService.exportToExcel(this.dataSource.data,'orders');
  }

  public reload(){
    this.searchOrderByFieldsDTO.farmer = this.sharedService.userSession.id;
    this.searchOrderByFieldsDTO.status = undefined;
    this.searchOrderByFieldsDTO.dateIni = undefined;
    this.searchOrderByFieldsDTO.dateFin = undefined;
    this.searchOrderByFieldsDTO.destinationDistrict = undefined;
    this.searchOrderByFieldsDTO.destinationProvince = undefined;
    this.searchOrderByFieldsDTO.destinationRegion = undefined;
    this.searchOrderByFieldsDTO.priceFin = undefined;
    this.searchOrderByFieldsDTO.priceIni = undefined;

    let param = {
      data : this.searchOrderByFieldsDTO
    }
    this.restService.requestApiRestData('order/globf',param).subscribe(result =>{
      this.dataSource = new MatTableDataSource(result.datalist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
}
