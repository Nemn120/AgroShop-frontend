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
import { SearchOrderByFieldsDTO } from 'src/app/_DTO/SearchOrderByFieldsDTO';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.scss']
})
export class OrderReportComponent implements OnInit {
  displayedColumns: string[] = ['id','address','phone','reference','destinationRegion','destinationProvince','destinationDistrict','status','actions'];
  dataSource: MatTableDataSource<OrderBean>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  orderBean: OrderBean;
  searchOrderByFieldsDTO:SearchOrderByFieldsDTO;
  constructor(
    private restService: RestService,
    public dialog: MatDialog,
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.searchOrderByFieldsDTO = new SearchOrderByFieldsDTO();
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
      console.log('orders with place: ',result);
    }
    );
}

}
