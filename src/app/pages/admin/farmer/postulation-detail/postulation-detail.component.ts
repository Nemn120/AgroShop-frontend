import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostulationBean } from 'src/app/_model/PostulationBean';

@Component({
  selector: 'app-postulation-detail',
  templateUrl: './postulation-detail.component.html',
  styleUrls: ['./postulation-detail.component.scss']
})
export class PostulationDetailComponent {

  constructor(
    public dialogRef: MatDialogRef<PostulationDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostulationBean
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
