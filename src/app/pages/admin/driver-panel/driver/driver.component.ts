import { Component, OnChanges, OnInit, SimpleChanges, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { RestService } from 'src/app/_service/rest.service';
import {MatPaginator} from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { InfoDriverComponent } from '../info-driver/info-driver.component';
import { MatDialog } from '@angular/material/dialog';
// import { Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit{

  displayedColumns: string[] = ['id','user.name', 'user.lastName','user.documentNumber', 'status','datos'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  status: string[] = ['Aceptado','Pendiente'];
  state = 'Aceptado';
  ids: number[] = [];
  drivers: any[] = [];
  dniValue: string = '';

  constructor(
    private restService: RestService,
    public dialog: MatDialog,
    // private router: Router,
  ) { this.getListDriverByStatus('Aceptado'); }

  ngOnInit(): void {
  }

  getListDriverByStatus(status: string): void {
    const param = {
      data: status
    };
    this.restService.requestApiRestData('driver/gldbs', param)
      .subscribe( result => {
        this.dataSource = new MatTableDataSource(result.datalist);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.drivers = result.datalist;
      }
      );
  }

  setIds(element: any) {
    let id: number = element.id;
    let nombre: string = element.user.name;
    this.ids.push(id);

    Swal.fire({
      title: `¿Activar Usuario ${nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Activar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.changeStatusDriver(this.ids);
        Swal.fire(
          'Usuario activado con éxito!',
          `Usuario ${nombre} activado.`,
          'success'
        );
        this.getListDriverByStatus('Aceptado');
      }
    });

  }

  changeStatusDriver(ids: number[]): void {
    const param = {
      data: ids
    };
    this.restService.requestApiRestData('driver/adr', param)
      .subscribe( result => console.log(result));
  }

  searchDriver(termino: string): any {
    const drivers: any[] = [];
    const dni = termino.toLowerCase();
    let dniInsert: string = '';
    this.drivers.forEach(driver => {
      dniInsert = driver.user.documentNumber?.toLowerCase() || '';
      if (dniInsert.startsWith(dni)) {
        drivers.push(driver);
      }
    });
    this.dataSource = new MatTableDataSource(drivers);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openInfoDriverModal(driver: any): void {
    const dialogRef = this.dialog.open(InfoDriverComponent, {
      width: 'auto', height: 'auto',
      data: driver,
      panelClass: 'custom-dialog-container'
    });
  }

  borrar(){
    this.dniValue = '';
    this.getListDriverByStatus('Aceptado');
  }
}
