import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { OrderBean } from 'src/app/_model/OrderBean';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { SendJobOfferComponent } from '../send-job-offer/send-job-offer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-pending',
  templateUrl: './order-pending.component.html',
  styleUrls: ['./order-pending.component.scss']
})
export class OrderPendingComponent implements OnInit {
  displayedColumns: string[] = ['id','address','phone','reference','destinationRegion','destinationProvince','destinationDistrict','status','actions','message'];
  dataSource: MatTableDataSource<OrderBean>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  orderBean: OrderBean;
  constructor(
    private restService: RestService,
    public dialog: MatDialog,
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.listData();
    this.restService.messageChange.subscribe(data => {
      this.listData();
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

  
  public sendOffer(order: OrderBean){
    let ord = order != null ? order : new OrderBean();
    this.dialog.open(SendJobOfferComponent, {
      width: '750px',
      data: ord,
    });
  }
listData(){
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
    }
    );
}
}
