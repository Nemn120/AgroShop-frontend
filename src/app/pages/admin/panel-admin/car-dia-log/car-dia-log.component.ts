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
import { DialogoConfirmacionComponent } from 'src/app/_shared/dialogo-confirmacion/dialogo-confirmacion.component';


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
    })
    console.log(this.orderService.orderDetailList);
    
  }
  sendOrder() {
    
    if (this.orderDetailListSelect.length > 0) {
      if (!this.sharedService.userSession){
        this.snackBar.open('Inicie sesión para enviar la orden', 'INFO', { duration: 5000 });
        this.closeDialog();
        this.router.navigate(['auth/login']);
        return;
      }
      if(!this.orderDetailListSelect){//this.orderService.newOrder.address
        this.sendOrderConfirm();
      }else{
        this.dialogo
        .open(DataClientComponent, {
          width:'25%',
          data: new OrderBean()
        })
        .afterClosed()
        .subscribe((confirmado) => {
            if (confirmado){
              this.sendOrderConfirm();
            }       
        });
      }
    } else {
      //alert('Seleccione algun producto');
    }
  }
  sendOrderConfirm():void{
    console.log(this.orderDetailListSelect);
    Swal.fire({
      title: 'Esta seguro de enviar la orden?',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick:false,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Generar orden'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Se han registrado su orden',
          'La orden ha sido enviada.',
          'success'
        );

      }
      this.closeDialog();
    });


  }
}
