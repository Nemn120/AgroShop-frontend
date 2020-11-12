import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogoConfirmacionComponent } from 'src/app/_shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { OrderDetailComponent } from 'src/app/_shared/order-detail/order-detail.component';
import { OrderService } from 'src/app/_service/order.service';
import { OrderDetailBean } from 'src/app/_model/OrderDetailBean';
import { SharedService } from 'src/app/_service/shared.service';


@Component({
  selector: 'app-car-dia-log',
  templateUrl: './car-dia-log.component.html',
  styleUrls: ['./car-dia-log.component.scss']
})
export class CarDiaLogComponent implements OnInit {

  
  orderDetailListSelect:OrderDetailBean[]=[];
  totalPrice:number=0;
  constructor( public dialogo: MatDialog,
    public dialog: MatDialogRef<CarDiaLogComponent>,
    public orderService:OrderService,
    public sharedService:SharedService) { }

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
    })
    console.log(this.orderService.orderDetailList);
    
  }

  sendOrder():void{
    console.log(this.orderDetailListSelect);
    const params = {
      title: 'Generar pedido',
      description: '¿Desea realizar el pedido?',
      inputData: true
    };
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: params,
        width: '25%',
        height: '35%',
      })
      .afterClosed()
      .subscribe((confirmado) => {
        if (confirmado) {
            console.log("Hola");
            this.closeDialog();
                this.dialogo.open(OrderDetailComponent, {
                  width: '600px',
                });          
          }
          this.dialog.close();
      }); 
  }
}