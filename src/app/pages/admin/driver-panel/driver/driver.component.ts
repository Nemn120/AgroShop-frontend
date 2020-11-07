import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DriverBean } from 'src/app/_model/DriverBean';
import { RestService } from 'src/app/_service/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  displayedColumns: string[] = ['id', 'user.username', 'user.profile.description', 'status'];
  dataSource: MatTableDataSource<any>;

  status: string[] = ['Pendiente', 'Aceptado'];
  ids: number[] = [];
  drivers: any[] = [];

  constructor( private restService: RestService ) {}

  ngOnInit(): void {
    this.getListDriverByStatus('Aceptado');
  }

  getListDriverByStatus(status: string): void {
    const param = {
      data: status
    };
    this.restService.requestApiRestData('driver/gldbs', param)
      .subscribe( result => {
        this.dataSource = new MatTableDataSource(result.datalist);
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
    /* console.log('FILTRANDO...' + termino);
    console.log(drivers); */
  }

}
