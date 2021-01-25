import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from 'src/app/_service/rest.service';
import Swal from 'sweetalert2';
import { PostulationApplicantsDetailComponent } from '../postulation-applicants-detail/postulation-applicants-detail.component';

@Component({
  selector: 'app-postulation-applicants',
  templateUrl: './postulation-applicants.component.html',
  styleUrls: ['./postulation-applicants.component.scss']
})
export class PostulationApplicantsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'lastname', 'documentNumber', 'actions'];
  dataSource: MatTableDataSource<any>;
  titleDetailPostulation = 'Postulantes';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private restService: RestService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<PostulationApplicantsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { this.dataSource = new MatTableDataSource(data); }
  ngOnInit(): void {
    this.setTitleDetailPostulation();
  }

  setTitleDetailPostulation(): void {
    if (this.data[0].statusPostulation === 'Aceptada') {
      this.titleDetailPostulation = 'Conductor';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  acceptPostulation(id: number) {
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

              this.restService.message(data.responseMessage, 'Info');
            }
          );
      }
    });
    this.dialogRef.close();
  }

  viewDetailApplication(driver: any) {
    console.log(driver);
    this.dialog.open(PostulationApplicantsDetailComponent, {
      width: 'auto', height: 'auto',
      data: driver
    });
  }
}
