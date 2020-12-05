import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { OrderBean } from '../../../../_model/OrderBean';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderDetailBean } from '../../../../_model/OrderDetailBean';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
 

  orderDetailList: OrderDetailBean[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;



  dataSource: MatTableDataSource<OrderDetailBean>;
  titleOrderDetailList: string;
  displayedColumns: string[] = ['name', 'price','quantity','total',];

  constructor(
    private dialogRef: MatDialogRef<OrderDetailsComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: OrderBean,
    private restService: RestService,
    public sharedService: SharedService

  ) { }

  ngOnInit(): void {

    let param = {
      id: this.data.id,
    };
    this.restService.requestApiRestData('orderDetail/godbi', param)
      .subscribe( result => {
        this.dataSource = new MatTableDataSource(result.datalist);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(result.datalist);
      }
      );
  }

}
