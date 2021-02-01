import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { OrderBean } from 'src/app/_model/OrderBean';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { FormBuilder, FormGroup,FormControl  } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SalesReportDTO } from 'src/app/_DTO/SalesReportDTO';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.scss']
})
export class OrderReportComponent implements OnInit {
  displayedColumns: string[] = ['count','price','name','total'];
  dataSource: MatTableDataSource<OrderBean>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  form: FormGroup;
  orderBean: OrderBean;
  salesReportDTO:SalesReportDTO;
  initialDate:Date;
  finalDate:Date;
  constructor(
    private restService: RestService,
    public dialog: MatDialog,
    public sharedService: SharedService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.salesReportDTO = new SalesReportDTO();
    this.initialDate = new Date("2020-12-29"),
    this.finalDate = new Date(),
    this.form = this.fb.group({
      'initialDate': this.initialDate,
      'finalDate': this.finalDate,

    });
    this.searchByDates();
  }

  public searchByDates(){
   
    
      this.salesReportDTO.farmer = this.sharedService.userSession.id;
      this.salesReportDTO.status = "Pendiente";
      this.salesReportDTO.dateIni = this.form.value['initialDate'];
      this.salesReportDTO.dateFin = this.form.value['finalDate'];
      let param = {
        data : this.salesReportDTO
      }
      this.restService.requestApiRestData('orderDetail/gsr',param).subscribe(result =>{
        this.dataSource = new MatTableDataSource(result.datalist);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(result.datalist)
      })
    
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
