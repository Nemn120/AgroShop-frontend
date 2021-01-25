import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostulationBean } from 'src/app/_model/PostulationBean';

@Component({
  selector: 'app-postulation-reply',
  templateUrl: './postulation-reply.component.html',
  styleUrls: ['./postulation-reply.component.scss']
})
export class PostulationReplyComponent {

  reply: string;

  constructor(
    public dialogRef: MatDialogRef<PostulationReplyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostulationBean
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
