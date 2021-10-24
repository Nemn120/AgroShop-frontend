import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-driver',
  templateUrl: './info-driver.component.html',
  styleUrls: ['./info-driver.component.scss']
})
export class InfoDriverComponent implements OnInit{

  email: string = '';
  dni: string = '';
  telefono: string = '';
  fecha: string = '';
  direccion: string = '';
  licencia: string = '';

  constructor(
    public dialogRef: MatDialogRef<InfoDriverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.email = this.data.user.email || '-';
    this.dni = this.data.user.documentNumber || '-';
    this.telefono = this.data.user.cellPhone || '-';
    this.fecha = this.data.createDate || '-';
    this.direccion = this.data.user.address || '-';
    this.licencia = this.data.driverLicenseNumber || '-';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
