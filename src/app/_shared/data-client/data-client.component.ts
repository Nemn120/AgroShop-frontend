import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { OrderBean } from '../../_model/OrderBean';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

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
  title: string = "Lugar de entrega";
  buttonTitle: string = "Registrar";
  isUpdateOrder: boolean = false;
  constructor(
    public dialog: MatDialog, public dialogo: MatDialogRef<DataClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderBean,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogMap: MatDialog,
  
  ) { }

  enviarOrden() {

    this.order = new OrderBean();
    this.order.address = this.form.value['address'];
    this.order.reference = this.form.value['reference'];
    this.order.phone = this.form.value['phone']

    // CUANDO ENVIA LA ORDEN
    Swal.fire({
      title: 'Seguro de enviar sus datos?',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Enviar datos'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Se han registrado sus datos',
          'Los datos se han enviado.',
          'success'
        );

      }
      this.cerrarDialogo();
    });


    
    
  }


  ngOnInit(): void {

    this.address = new FormControl(''),
      this.reference = new FormControl(''),
      this.phone = new FormControl(''),
      this.form = this.fb.group({
        'address': this.address,
        'reference': this.reference,
        'phone': this.phone,
      });
    if (this.data) {
      this.form.setValue({
        'address': this.data.address,
        'reference': this.data.reference,
        'phone': this.data.phone,


      })
      this.title = "Actualizar lugar de entrega"
      this.buttonTitle = "Actualizar"
      this.isUpdateOrder = true;
    }
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
