import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { OrderBean } from '../../_model/OrderBean';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogoConfirmacionComponent } from '../../_shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { Message } from '../../_DTO/messageDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  

      let ms = new Message();
      ms.title = 'Confirmar Cambios';
      ms.description = '¿Desea guardar los cambios establecidos?';
      this.dialog
        .open(DialogoConfirmacionComponent, {
          data: ms,
          width: '25%',
          height: '35%',
        })
        .afterClosed()
        .subscribe((confirmado: Boolean) => {
          if (confirmado) {
            this.order.id = this.data.id;
            this.order.status = this.data.status;
            if(this.order.status=="Pendiente"||this.order.status=="En proceso"){
              //this.orderService.updateOrder(this.order).subscribe(data => { 
              //this.snackBar.open(data.message, 'SUCESS', { duration: 5000 });
             // });
            //this.notification.openSnackBar('Ubicacion guardada exito');
          //} else{
          //  this.notification.openSnackBar('No se puede modificar los datos de este pedido');
          }
          }
          setTimeout (x=>{
            this.dialog.closeAll();
          },2000);
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
