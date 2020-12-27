import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { OrderBean } from 'src/app/_model/OrderBean';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client-order-pending',
  templateUrl: './client-order-pending.component.html',
  styleUrls: ['./client-order-pending.component.scss']
})
export class ClientOrderPendingComponent implements OnInit {
  displayedColumns: string[] = ['id','farmer','date','place','total','status','actions','message'];
  dataSource: MatTableDataSource<OrderBean>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  orderBean: OrderBean;
  constructor( private restService: RestService,
               public dialog: MatDialog,
               public sharedService: SharedService,
               private snackBar: MatSnackBar) 
  { }

  ngOnInit(): void {
    this.loadData();
    this.restService.messageChange.subscribe(data => {
      this.loadData();
      this.restService.message(data.message, data.action);
    });
  }
  public openDetails(order: OrderBean) {
    let ord = order != null ? order : new OrderBean();
    this.dialog.open(OrderDetailsComponent, {
      width: '500px',
      data: ord,
    });
  }
  loadData(){
    let param = {
      id: this.sharedService.userSession.id,
      data: {
        status:"Pendiente"
      }
    };
    this.restService.requestApiRestData('order/golbspac', param)
      .subscribe( result => {
        this.snackBar.open(result.responseCode, 'INFO', {
          duration: 2000
        });
        this.dataSource = new MatTableDataSource(result.datalist);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(result.datalist); 
  
      }
      ); 
  }
}
