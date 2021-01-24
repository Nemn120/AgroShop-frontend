import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as FileSaver from 'file-saver';
import { FarmerBean } from 'src/app/_model/FarmerBean';
import { JobOfferBean } from 'src/app/_model/JobOfferBean';
import { OrderBean } from 'src/app/_model/OrderBean';
import { PostulationBean } from 'src/app/_model/PostulationBean';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import Swal from 'sweetalert2';
import { PostulationDetailComponent } from '../../farmer/postulation-detail/postulation-detail.component';
import { FormContractComponent } from '../form-contract/form-contract.component';
import { PostulationApplicantsComponent } from '../postulation-applicants/postulation-applicants.component';

@Component({
  selector: 'app-postulation-list',
  templateUrl: './postulation-list.component.html',
  styleUrls: ['./postulation-list.component.scss'],
})
export class PostulationListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'statusPostulation',
    'title',
    'statusOffer',
    'name',
    'actions',
  ];
  dataSource: MatTableDataSource<PostulationBean>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  postulation: PostulationBean = new PostulationBean();
  jobOffer: JobOfferBean = new JobOfferBean();
  order: OrderBean = new OrderBean();
  farmer: FarmerBean = new FarmerBean();
  statusList: any[] = ['Pendiente', 'Aceptada', 'Rechazada'];
  subtitlePerson = 'Postulantes';

  constructor(
    private restService: RestService,
    private sharedService: SharedService,
    private dialog: MatDialog
  ) {
    this.farmer = this.sharedService.userSession;
  }

  ngOnInit(): void {
    this.getPostulationByStatusAndId();
  }

  public getPostulationByStatusAndId(status: string = 'Pendiente'): any {
    this.postulation.statusPostulation = status;
    this.order.farmer = this.farmer;
    this.jobOffer.order = this.order;
    this.postulation.jobOffer = this.jobOffer;

    const param = {
      data: this.postulation,
    };

    if (status === 'Aceptada') {
      this.subtitlePerson = 'Conductor';
    }

    this.restService
      .requestApiRestData('postulation/fpbsafid', param)
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(
          this.filterByJobOfferId(data.datalist)
        );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  public filterByJobOfferId(arr: any[]): any {
    let ids = [];
    let response = [];

    arr.forEach((a) => ids.push([a.jobOffer.id]));
    ids = ids.filter((v, i, arreglo) => {
      return (
        arreglo.findIndex(
          (valor) => JSON.stringify(valor) === JSON.stringify(v)
        ) === i
      );
    });

    for (const item of arr) {
      const id = item.jobOffer.id;
      response.push(arr.filter((current) => id === current.jobOffer.id));
      response = response.filter((v, i, arreglo) => {
        return (
          arreglo.findIndex(
            (valor) => JSON.stringify(valor) === JSON.stringify(v)
          ) === i
        );
      });
    }
    return response;
  }

  public viewDetailPostulation(postulation: PostulationBean) {
    this.dialog.open(PostulationDetailComponent, {
      width: 'auto',
      height: 'auto',
      data: postulation,
    });
  }

  public viewApplicants(applicants: any) {
    console.log(applicants);
    const ref = this.dialog.open(PostulationApplicantsComponent, {
      width: 'auto',
      height: 'auto',
      data: applicants,
    });
  }

  public generateContract(postulation: PostulationBean) {
     this.dialog.open(FormContractComponent, {
      data: postulation,
      width: 'auto',
      height: 'auto'
    });
  }

  public aceptarPostulation(id: number) {
    const param = {
      data: id,
    };

    Swal.fire({
      title: 'Aceptar la postulación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.restService
          .requestApiRestData('postulation/apf', param)
          .subscribe((data) => {
            this.getPostulationByStatusAndId();
            this.restService.message(data.responseMessage, 'Info');
          });
      }
    });
  }

  public dowloadContract(id: number): void {

    const param = {
      data: id
    };

    this.restService.requestApiRestData('api/contrato/dcontract', param)
      .subscribe( resp => {
        const byteCharacters = atob(resp.data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {type : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
        const nombre = 'MiContrato';
        FileSaver.saveAs(blob, `${nombre}.docx`);
        this.restService.message(resp.responseMessage, 'Procesando ...');
    });

  }

}
