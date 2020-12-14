import { RestService } from './../../../../_service/rest.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostulationBean } from '../../../../_model/PostulationBean';

@Component({
  selector: 'app-postulation-detail',
  templateUrl: './postulation-detail.component.html',
  styleUrls: ['./postulation-detail.component.scss']
})
export class PostulationDetailComponent {

  reply = '';

  constructor(
    private restService: RestService,
    public dialogRef: MatDialogRef<PostulationDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostulationBean
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public reformulatePostulation() {

    if (this.reply.length > 0) {
      this.data.reply = this.reply;
      const param = {
          data: this.data
        };
      this.restService.requestApiRestData('postulation/afaj', param)
        .subscribe( dto => {
          this.restService.message(dto.responseMessage, 'Info');
        });
    }
  }

}
