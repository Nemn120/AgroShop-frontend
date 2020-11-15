import { Component, OnInit, Inject } from '@angular/core';
import { OrderBean } from 'src/app/_model/OrderBean';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatTableDataSource } from '@angular/material/table';
import { OrderDetailBean } from 'src/app/_model/OrderDetailBean';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  orderList:OrderBean[]=[];
  nombre: string;
  address: string;
  phone: string;
  costoTotal: number=0;
  cantidadTotal:number=0;
  fechaCreacion: Date;
  fecha:string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any, private snackBar: MatSnackBar,
   private dialogRef: MatDialogRef<OrderDetailBean>,
  ) { }

  ngOnInit(): void {
    this.orderList=this.data;
    this.orderList.forEach(order =>{
      this.costoTotal+=order.total;
      this.cantidadTotal+=order.quantity;
      
    })

    this.phone=this.orderList[0].phone;
    this.address=this.orderList[0].address;
    //this.nombre=this.orderList[0].userOrder.nombre;
    
    
    this.fechaCreacion = new Date(this.orderList[0].createDate);
    this.fecha = this.fechaCreacion.toLocaleString();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
