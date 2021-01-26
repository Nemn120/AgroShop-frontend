import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DriverBean } from 'src/app/_model/DriverBean';
import { SharedService } from 'src/app/_service/shared.service';
import Swal from 'sweetalert2';
import { PostulationBean } from '../../../../_model/PostulationBean';
import { RestService } from '../../../../_service/rest.service';
import { PostulationDetailComponent } from '../postulation-detail/postulation-detail.component';
import { PostulationReplyComponent } from '../postulation-reply/postulation-reply.component';

@Component({
  selector: 'app-postulation-list',
  templateUrl: './postulation-list.component.html',
  styleUrls: ['./postulation-list.component.scss']
})
export class PostulationListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'statusPostulation', 'title', 'statusOffer', 'postulationDate', 'actions'];
  dataSource: MatTableDataSource<PostulationBean>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  postulation: PostulationBean = new PostulationBean();
  driver: DriverBean = new DriverBean();
  statusList: any[] = ['Pendiente', 'Aceptada', 'Rechazada'];

  constructor(
    private restService: RestService,
    private sharedService: SharedService,
    private dialog: MatDialog
    ) {
       this.driver = this.sharedService.userSession;
    }

    ngOnInit(): void {
      this.getPostulationByStatusAndId();
    }

    public getPostulationByStatusAndId(status: string = 'Pendiente'): any {

      this.postulation.statusPostulation = status;
      this.postulation.driver = this.driver;

      const param = {
        data: this.postulation
      };

      this.restService.requestApiRestData('postulation/fpbsaid', param)
      .subscribe(
        data => {
          this.dataSource = new MatTableDataSource(data.datalist);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
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

  public reformulatePostulation(postulation: PostulationBean) {

    const dialogRef = this.dialog.open(PostulationReplyComponent, {
      width: 'auto', height: 'auto',
      data: postulation
    });

    dialogRef.afterClosed().subscribe( result => {

      if (result) {
        const param = {
          data: result
        };
        this.restService.requestApiRestData('postulation/afaj', param)
        .subscribe(
          data => {
            this.dataSource = new MatTableDataSource(data.datalist);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.restService.message(data.responseMessage, 'Info');
          }
        );
      }
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
}
