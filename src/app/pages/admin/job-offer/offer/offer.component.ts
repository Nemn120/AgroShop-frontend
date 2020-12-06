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
  departments : string[] = ['Todos','Amazonas', 'Ancash', 'Apurimac', 'Arequipa', 'Ayacucho', 'Cajamarca', 'Cusco', 'Huancavelica', 'Huanuco'
  , 'Ica', 'Junin', 'La Libertad', 'Lambayeque', 'Lima', 'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco', 'Piura', 'Puno', 'San Martin'
  , 'Tacna', 'Tumbes', 'Ucayali'];
  name: string;
  lastName: string;
  districtList:UbigeoBean[]=[];
  provinceList:UbigeoBean[]=[];
  regionList:UbigeoBean[]=[];
  regionCode:string;
  constructor(
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private restService: RestService
  ) { }

  ngOnInit(): void {
    this.listarRegiones();
    this.listOffer();
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
          this.regionList.push(ubigeo)  
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
      this.regionCode = event.value
      this.provinceList = result.datalist;
      this.districtList = [];
    }, error => {
      console.error(error);
    });
  }

  public listarDistritosSegunIdProvincia(event: any) {
    let params = {
      data: {
        codigoProvincia: event.value,
        codigoDepartamento: this.regionCode
      }
    }
    this.restService.requestApiRestData("ubigeo/gdbpr", params).subscribe((result: any) => {
      this.districtList = result.datalist;
    }, error => {
      console.error(error);
    });
  }

  listOffer(){
    this.name = undefined;
    this.lastName = undefined;
    if(this.searchJobOffer.departmentIni == 'Todos')
      this.searchJobOffer.departmentIni = undefined;

    if(this.searchJobOffer.departmentFin == 'Todos')
      this.searchJobOffer.departmentFin = undefined;

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
      if(this.searchJobOffer.idFarmer != null){
        let param2 = {
          id: this.searchJobOffer.idFarmer
        }
        this.restService.requestApiRestData('farmer/gfbi',param2).subscribe(result =>{
          if(result.responseMessage != 'No se encontró al agricultor'){
            this.name = result.data.user.name;
            this.lastName = result.data.user.lastName;
          }
        })
      }
    }
  }
}
