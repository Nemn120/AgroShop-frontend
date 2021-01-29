import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderBean } from 'src/app/_model/OrderBean';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import { ConfirmOrderComponent } from '../confirm-order/confirm-order.component';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'farmer', 'date', 'place', 'total', 'status', 'actions'];
  dataSource: MatTableDataSource<OrderBean>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  orderBean: OrderBean;
  action = 'SUCCESS';
  statusList: any[] = ['Publicada', 'Sin conductor', 'Atendido', 'En camino', 'Entregado', 'Cancelado'];

  constructor( private restService: RestService,
               public dialog: MatDialog,
               public sharedService: SharedService) { }

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
      data: ord
    });
  }

  openConfirmOrden(order: OrderBean) {
    const ord = order != null ? order : new OrderBean();
    this.dialog.open(ConfirmOrderComponent, {
      width: '500px',
      data: ord,
    });
  }

  loadData(state: string = 'Pendiente') {
    const param = {
      id: 1, // this.sharedService.userSession.id,
      data: {
        status: state
      }
    };
    console.log(param);
    this.restService.requestApiRestData('order/gobsc', param)
      .subscribe( result => {
        this.dataSource = new MatTableDataSource(result.datalist);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      );
  }

}
