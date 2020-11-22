import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { OrderBean } from 'src/app/_model/OrderBean';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-order-pending',
  templateUrl: './order-pending.component.html',
  styleUrls: ['./order-pending.component.scss']
})
export class OrderPendingComponent implements OnInit {
  displayedColumns: string[] = ['id', 'attentDate','userName','total','status','actions','message'];
  dataSource: MatTableDataSource<OrderBean>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private restService: RestService,
    public dialog: MatDialog,
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    let param = {
      id: this.sharedService.userSession.id,
      data: {
        status:"Pendiente"
      }
    };
    this.restService.requestApiRestData('order/gobsf', param)
      .subscribe( result => {
        this.dataSource = new MatTableDataSource(result.datalist);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(result.datalist);
      }
      );
  }
  public openDetails(order: any) {
    this.dialog.open(OrderDetailsComponent, {
      width: '750px',
      data: order
    });
  }

}
