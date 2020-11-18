import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DataClientComponent } from 'src/app/_shared/data-client/data-client.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrderBean } from 'src/app/_model/OrderBean';
import Swal from 'sweetalert2';
import { OrderDetailComponent } from 'src/app/_shared/order-detail/order-detail.component';
import { OrderService } from 'src/app/_service/order.service';
import { OrderDetailBean } from 'src/app/_model/OrderDetailBean';
import { SharedService } from 'src/app/_service/shared.service';
import { RestService } from 'src/app/_service/rest.service';
import { DialogoConfirmacionComponent } from 'src/app/_shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { ProductSalesBean } from 'src/app/_model/ProductSalesBean';


@Component({
  selector: 'app-car-dia-log',
  templateUrl: './car-dia-log.component.html',
  styleUrls: ['./car-dia-log.component.scss']
})
export class CarDiaLogComponent implements OnInit {


  orderDetailListSelect:OrderDetailBean[]=[];
  totalPrice:number=0;
  productSelect: ProductSalesBean;
  imagenData: any;
  imagenEstado: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  labelFile: string;
  sendOrderCar: OrderBean;
  constructor( public dialogo: MatDialog,
    public dialog: MatDialogRef<CarDiaLogComponent>,
    public orderService:OrderService,
    public sharedService:SharedService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }


  closeDialog() {
    this.dialog.close();
  }

  selectOrderProduct(event:any){
    this.orderDetailListSelect=event;
    this.totalPrice=0;
    if(this.orderDetailListSelect.length>0){
      this.orderDetailListSelect.forEach(x =>{
        if(x.quantity>x.productSales.availableQuantity){
          x.quantity=x.productSales.availableQuantity
          let index=this.orderService.orderDetailList.findIndex(data=>data.productSales.id==x.productSales.id);
          this.orderService.orderDetailList[index].quantity=x.productSales.availableQuantity
        }

        this.totalPrice+=x.price*x.quantity;

      })
    }
  }
  deleteItemsSelect(){

    this.orderDetailListSelect.forEach(x=>{
      this.orderService.orderDetailList=this.orderService.orderDetailList.filter(data=>data.productSales.id != x.productSales.id);
      this.orderService.totalQuantitySubject.next(this.orderService.totalQuantity-x.quantity);
      this.orderService.totalQuantity = this.orderService.totalQuantity-x.quantity;
    })
    console.log(this.orderService.orderDetailList);

  }
  sendOrder() {

    if (this.orderDetailListSelect.length > 0) {
      let orderSend=new OrderBean();
      orderSend.orderDetailList=this.orderDetailListSelect;
        this.dialogo
        .open(DataClientComponent, {
          width:'25%',
          data:orderSend
        })
    }
  }
}
