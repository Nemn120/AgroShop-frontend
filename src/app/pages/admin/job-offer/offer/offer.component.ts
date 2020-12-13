import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { rejects } from 'assert';
import { Observable } from 'rxjs';
import { JobOfferByFields } from 'src/app/_model/JobOfferByFields';
import { UbigeoBean } from 'src/app/_model/UbigeoBean';
import { RestService } from 'src/app/_service/rest.service';
import { OfferDetailComponent } from '../offer-detail/offer-detail.component';
@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})

export class OfferComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  obs: Observable<any>;
  searchJobOffer : JobOfferByFields = new JobOfferByFields;
  originDistrictList:UbigeoBean[]=[];
  originProvinceList:UbigeoBean[]=[];
  originRegionList:UbigeoBean[]=[];
  originRegionCode:string;

  destinationDistrictList:UbigeoBean[]=[];
  destinationProvinceList:UbigeoBean[]=[];
  destinationRegionList:UbigeoBean[]=[];
  destinationRegionCode:string;

  constructor(
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private restService: RestService
  ) { }

  ngOnInit(): void {
    this.listarRegiones();
    this.listOffer();
    this.listarRegionesDestination();
  }

  moreDetails(job){
    this.dialog.open(OfferDetailComponent, {
      data: job,
      width :'50%',
      minHeight: "50%",
      minWidth : "400px"
    });
  }

  ngOnDestroy(){
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }
  public listarRegiones() :Promise<any>{
    return new Promise((resolve,reject)=>{
      this.restService.requestApiRestData("ubigeo/grl", {}).subscribe((result: any) => {
        result.datalist.forEach(ubigeo=>{
          this.originRegionList.push(ubigeo)  
        })
        resolve("success")
      }, error => {
        console.error(error);
      });
    });
  }

  public listarProvinciasSegunIdRegion(event: any) {
    let params = {
      data: {
        codigoDepartamento: event.value
      }
    }
    this.restService.requestApiRestData("ubigeo/gpbr", params).subscribe((result: any) => {
      this.originRegionCode = event.value
      this.originProvinceList = result.datalist;
      this.originDistrictList = [];
    }, error => {
      console.error(error);
    });
  }

  public listarDistritosSegunIdProvincia(event: any) {
    let params = {
      data: {
        codigoProvincia: event.value,
        codigoDepartamento: this.originRegionCode
      }
    }
    this.restService.requestApiRestData("ubigeo/gdbpr", params).subscribe((result: any) => {
      this.originDistrictList = result.datalist;
      
    }, error => {
      console.error(error);
    });
  }

  public listarRegionesDestination() :Promise<any>{
    return new Promise((resolve,reject)=>{
      this.restService.requestApiRestData("ubigeo/grl", {}).subscribe((result: any) => {
        result.datalist.forEach(ubigeo=>{
          this.destinationRegionList.push(ubigeo)  
        })
        resolve("success")
      }, error => {
        console.error(error);
      });
    });
  }

  public listarProvinciasSegunIdRegionDestination(event: any) {
    let params = {
      data: {
        codigoDepartamento: event.value
      }
    }
    this.restService.requestApiRestData("ubigeo/gpbr", params).subscribe((result: any) => {
      this.destinationRegionCode = event.value
      this.destinationProvinceList = result.datalist;
      this.destinationDistrictList = [];
    }, error => {
      console.error(error);
    });
  }

  public listarDistritosSegunIdProvinciaDestination(event: any) {
    let params = {
      data: {
        codigoProvincia: event.value,
        codigoDepartamento: this.destinationRegionCode
      }
    }
    this.restService.requestApiRestData("ubigeo/gdbpr", params).subscribe((result: any) => {
      this.destinationDistrictList = result.datalist;
    }, error => {
      console.error(error);
    });
  }

  listOffer(){
    if(this.searchJobOffer.weightIni == null)
      this.searchJobOffer.weightFin = undefined;

    if(this.searchJobOffer.priceIni == null)
      this.searchJobOffer.priceFin = undefined;

    if(this.searchJobOffer.weightIni>this.searchJobOffer.weightFin || this.searchJobOffer.priceIni>this.searchJobOffer.priceFin){
      this.restService.messageChange.next({ message: 'Rango equivocado', action: "Fail" });
    }
    else{
      let param = {
        data: this.searchJobOffer
      }
      this.restService.requestApiRestData('joboffer/gljobf',param).subscribe(result =>{
        this.dataSource = new MatTableDataSource(result.datalist);
        this.changeDetectorRef.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
        if(result.responseMessage == 'No se encontraron ofertas laborales que coincidan con la busqueda'){
          this.restService.messageChange.next({ message: result.responseMessage, action: "Ofertas" });
        }
      })
    }
  }
}
