import { Component, OnChanges, OnInit, SimpleChanges, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { RestService } from 'src/app/_service/rest.service';
import {MatPaginator} from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  displayedColumns: string[] = ['id', 'user.username', 'user.profile.description', 'status'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  status: string[] = ['Pendiente', 'Aceptado'];
  ids: number[] = [];
  drivers: any[] = [];

  constructor( private restService: RestService ) { this.getListDriverByStatus('Aceptado'); }

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
        console.log(result.datalist);
      }
      );
  }

  setIds(id: number) {
    this.ids.push(id);

    Swal.fire({
      title: 'Seguro de cambiar el estado?',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cambiar estado'
    }).then((result) => {
      if (result.isConfirmed) {
        this.changeStatusDriver(this.ids);
        Swal.fire(
          'Cambio realizado con éxito!',
          'El estado se ha cambiado.',
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
    const name = termino.toLowerCase();
    this.drivers.forEach(driver => {
      if (driver.user.username.toLowerCase().includes(name)) {
        drivers.push(driver);
      }
    });
    this.dataSource = new MatTableDataSource(drivers);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
