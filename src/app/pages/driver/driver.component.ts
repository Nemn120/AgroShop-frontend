import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DriverBean } from 'src/app/_model/DriverBean';
import { RestService } from 'src/app/_service/rest.service';
import Swal from 'sweetalert2';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

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

  constructor(
    private restService: RestService
  ) {
  }

  ngOnInit(): void {
    this.getListDriverByStatus('Pendiente');
  }

  getListDriverByStatus(status: string): void {
    const param = {
      data: status
    };
    this.restService.requestApiRestData('driver/gldbs', param)
      .subscribe( result => {
        this.dataSource = new MatTableDataSource(result.datalist);
        // this.drivers = result.datalist;
        console.log(result.datalist);
      }
      );
  }

  chargeDataStatus(id: number) {
    this.ids.push(id);
    this.changeStatusDriver(this.ids);

    Swal.fire({
      title: 'Seguro que desea eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cambiar estado'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
        this.getListDriverByStatus('Pendiente');
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

}
