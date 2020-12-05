import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DriverBean } from 'src/app/_model/DriverBean';
import { FarmerBean } from 'src/app/_model/FarmerBean';
import { JobOfferBean } from 'src/app/_model/JobOfferBean';
import { OrderBean } from 'src/app/_model/OrderBean';
import { PostulationBean } from 'src/app/_model/PostulationBean';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import Swal from 'sweetalert2';
import { PostulationDetailComponent } from '../../farmer/postulation-detail/postulation-detail.component';

@Component({
  selector: 'app-postulation-list',
  templateUrl: './postulation-list.component.html',
  styleUrls: ['./postulation-list.component.scss']
})
export class PostulationListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'statusPostulation', 'title', 'statusOffer', 'name', 'actions'];
  dataSource: MatTableDataSource<PostulationBean>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  postulation: PostulationBean = new PostulationBean();
  jobOffer: JobOfferBean = new JobOfferBean();
  order: OrderBean = new OrderBean();
  farmer: FarmerBean = new FarmerBean();
  statusList: any[] = ['Pendiente', 'Aceptada', 'Rechazada'];

  constructor(
    private restService: RestService,
    private sharedService: SharedService,
    private dialog: MatDialog
    ) {
       // this.farmer.id = this.sharedService.userSession.id;
       this.farmer.id = 1;
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
        data: this.postulation
      };
      console.log(param);
      this.restService.requestApiRestData('postulation/fpbsafid', param)
      .subscribe(
        data => {
          this.dataSource = new MatTableDataSource(data.datalist);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.restService.message(data.responseMessage, 'Info');
        }
      );
  }

  /* public searchPostulation(event: Event) {
    const item = (event.target as HTMLInputElement).value;
    this.dataSource.filter = item.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } */

  public viewDetailPostulation(postulation: PostulationBean) {
    this.dialog.open(PostulationDetailComponent, {
      width: 'auto', height: 'auto',
      data: postulation
    });
  }

  public deletePostulation(id: number) {
    const param = {
      data: id
    };

    Swal.fire({
      title: 'Eliminar la postulación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.restService.requestApiRestData('postulation/dpbid', param)
          .subscribe(
            data => {
              this.getPostulationByStatusAndId();
              this.restService.message(data.responseMessage, 'Info');
            }
          );
      }
    });
  }

  aceptarPostulation(id: number) {
    const param = {
      data: id
    };

    Swal.fire({
      title: 'Aceptar la postulación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.restService.requestApiRestData('postulation/apf', param)
          .subscribe(
            data => {
              this.getPostulationByStatusAndId();
              this.restService.message(data.responseMessage, 'Info');
            }
          );
      }
    });
  }

}
