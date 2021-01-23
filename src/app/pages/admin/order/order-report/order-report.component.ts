import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { OrderBean } from 'src/app/_model/OrderBean';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { SearchOrderByFieldsDTO } from 'src/app/_DTO/SearchOrderByFieldsDTO';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
downloadPDF() {
  const DATA = document.getElementById('htmlData');
  const doc = new jsPDF('p', 'pt', 'a4');
  const options = {
    background: 'white',
    scale: 3
  };
  html2canvas(DATA, options).then((canvas) => {

    const img = canvas.toDataURL('image/PNG');

    const bufferX = 15;
    const bufferY = 15;
    const imgProps = (doc as any).getImageProperties(img);
    const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
    return doc;
  }).then((docResult) => {
    docResult.save("ventas.pdf");
  });
}
}
