import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { OrderBean } from '../../_model/OrderBean';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { OrderDetailBean } from 'src/app/_model/OrderDetailBean';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { OrderService } from 'src/app/_service/order.service';

@Component({
  selector: 'app-data-client',
  templateUrl: './data-client.component.html',
  styleUrls: ['./data-client.component.scss']
})
export class DataClientComponent implements OnInit {

  order: OrderBean
  form: FormGroup;
  address: FormControl;
  reference: FormControl;
  phone: FormControl;
  maxDate: FormControl;
  title: string = "Lugar de entrega";
  buttonTitle: string = "Registrar";
  isUpdateOrder: boolean = false;
  constructor(
    public dialog: MatDialog, public dialogo: MatDialogRef<DataClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderBean,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogMap: MatDialog,
    public orderService: OrderService
  
  ) { }

  enviarOrden() {

    this.order = new OrderBean();
    this.order.address = this.form.value['address'];
    this.order.reference = this.form.value['reference'];
    this.order.phone = this.form.value['phone'];
    //this.order.maxDate= this.form.value['maxDate'];

    // CUANDO ENVIA LA ORDEN
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
        this.cerrarDialogo();
          //this.sendOrder(this.form.value.address,this.form.value.reference,this.form.value.phone);
            
         
          this.dialog.open(OrderDetailComponent, {
          width:'30%',
          data: new OrderBean()
        })
        

      }
      
    });


  }


  ngOnInit(): void {

    this.address = new FormControl(''),
      this.reference = new FormControl(''),
      this.phone = new FormControl(''),
      this.maxDate= new FormControl(''),
      this.form = this.fb.group({
        'address': this.address,
        'reference': this.reference,
        'phone': this.phone,
        'maxDate': this.maxDate,
      });
   
    
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {

    this.dialogo.close(true);
  }
  sendOrder(address:string,reference:string,phone:string) {
    let orderSelect= new OrderBean();
    orderSelect.address=this.form.value.address;
    orderSelect.reference=this.form.value.reference;
    orderSelect.phone=this.form.value.phone;

    this.orderService.sendNewOrder(orderSelect.address,orderSelect.reference,orderSelect.phone);
  }
}
