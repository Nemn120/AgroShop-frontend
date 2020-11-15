import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { OrderBean } from '../../_model/OrderBean';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { OrderDetailBean } from 'src/app/_model/OrderDetailBean';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { OrderService } from 'src/app/_service/order.service';
import { ClientBean } from 'src/app/_model/ClientBean';
import { SharedService } from 'src/app/_service/shared.service';
import { RestService } from 'src/app/_service/rest.service';

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
    public orderService: OrderService,
    private sharedData:SharedService,
    private restService:RestService
  
  ) { }

  enviarOrden() {

    this.order = this.data;
    this.order.address = this.form.value['address'];
    this.order.reference = this.form.value['reference'];
    this.order.phone = this.form.value['phone'];
    this.order.client = new ClientBean();
    this.order.client=this.sharedData.userSession;
    
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
        let param={
          data:this.order
        }
        this.restService.requestApiRestData("order/sobos",param).subscribe(result=>{
          console.log(result);
          // llamar al snackbar  para el mensaje
          this.dialog.open(OrderDetailComponent, {
            width:'30%',
            data: result.datalist
          })
        })



        Swal.fire(
          'Se han registrado su orden',
          'La orden ha sido enviada.',
          'success'
          
        );
        this.cerrarDialogo();
      
        

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

}
