import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DriverBean } from 'src/app/_model/DriverBean';

@Component({
  selector: 'app-postulation-applicants-detail',
  templateUrl: './postulation-applicants-detail.component.html',
  styleUrls: ['./postulation-applicants-detail.component.scss']
})
export class PostulationApplicantsDetailComponent {

  constructor(
    public dialogRef: MatDialogRef<PostulationApplicantsDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
