import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderBean } from 'src/app/_model/OrderBean';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import Swal from 'sweetalert2';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-client-order-pending',
  templateUrl: './client-order-pending.component.html',
  styleUrls: ['./client-order-pending.component.scss']
})
export class ClientOrderPendingComponent implements OnInit {
  displayedColumns: string[] = ['id', 'farmer', 'date', 'place', 'total', 'status', 'actions', 'message'];
  dataSource: MatTableDataSource<OrderBean>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  orderBean: OrderBean;
  action = 'SUCCESS';
  constructor( private restService: RestService,
               public dialog: MatDialog,
               public sharedService: SharedService,
               private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadData();
    this.restService.messageChange.subscribe(data => {
      this.loadData();
      this.restService.message(data.message, data.action);
    });
  }
  public openDetails(order: OrderBean) {
    const ord = order != null ? order : new OrderBean();
    this.dialog.open(OrderDetailsComponent, {
      width: '500px',
      data: ord,
    });
  }

  cancellOrder(order: OrderBean) {
    Swal.fire({
      title: 'Esta seguro de cancelar la orden?',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cancelar orden'
    }).then((result) => {
      if (result.isConfirmed) {
        const param = {
          id: order.id
        };
        this.restService.requestApiRestData('order/cor', param).subscribe(result => {
          this.restService.messageChange.next({ message: result.responseMessage, action: this.action });

        });

      }

    });
  }

  loadData() {
    const param = {
      id: this.sharedService.userSession.id,
      data: {
        status: 'Pendiente'
      }
    };
    this.restService.requestApiRestData('order/golbspac', param)
      .subscribe( result => {

        this.dataSource = new MatTableDataSource(result.datalist);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      }
      );
  }

  changeStatusOrder(idOrder: number) {
    const param = {
      data: idOrder
    };
    this.restService.requestApiRestData('order/cso', param)
      .subscribe( result => {
        this.dataSource = new MatTableDataSource(result.datalist);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        if (result) {
          this.restService.messageChange.next({message: 'El pedido está en camino', action: this.action});
        } else {
          this.restService.messageChange.next({message: 'Error', action: this.action});
        }
      });
  }
}
