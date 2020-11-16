import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-driver',
  templateUrl: './info-driver.component.html',
  styleUrls: ['./info-driver.component.scss']
})
export class InfoDriverComponent {

  constructor(
    public dialogRef: MatDialogRef<InfoDriverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
