import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { JobOfferByFields } from 'src/app/_model/JobOfferByFields';
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

  constructor(
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private restService: RestService
  ) { }

  ngOnInit(): void {
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

  listOffer(){
    
    if(this.searchJobOffer.departmentIni == 'Todos')
      this.searchJobOffer.departmentIni = undefined;

    if(this.searchJobOffer.departmentFin == 'Todos')
      this.searchJobOffer.departmentFin = undefined;

    if(this.searchJobOffer.weightIni == '' || this.searchJobOffer.weightIni == null)
      this.searchJobOffer.weightIni = undefined;

    if(this.searchJobOffer.weightFin == '' || this.searchJobOffer.weightFin == null)
      this.searchJobOffer.weightFin = undefined;

    if(this.searchJobOffer.priceIni == '' || this.searchJobOffer.priceIni == null)
      this.searchJobOffer.priceIni = undefined;

    if(this.searchJobOffer.priceFin == '' || this.searchJobOffer.priceFin == null)
      this.searchJobOffer.priceFin = undefined;

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
