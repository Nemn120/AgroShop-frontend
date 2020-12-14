import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { OrderBean } from '../../_model/OrderBean';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { OrderService } from 'src/app/_service/order.service';
import { ClientBean } from 'src/app/_model/ClientBean';
import { SharedService } from 'src/app/_service/shared.service';
import { RestService } from 'src/app/_service/rest.service';
import { UbigeoBean } from 'src/app/_model/UbigeoBean';
import { OrderDetailBean } from 'src/app/_model/OrderDetailBean';



import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { AngularFireFunctions } from '@angular/fire/functions';

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
  destinationRegion: FormControl;
  destinationProvince: FormControl;
  destinationDistrict: FormControl;
  districtList:UbigeoBean[]=[];
  provinceList:UbigeoBean[]=[];
  regionList:UbigeoBean[]=[];
  regionCode:string;
  title: string = "Lugar de entrega";
  buttonTitle: string = "Enviar Orden";
  isUpdateOrder: boolean = false;
  private stripe: Stripe;
  constructor(
    public dialog: MatDialog, public dialogo: MatDialogRef<DataClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderBean,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogMap: MatDialog,
    public orderService: OrderService,
    private sharedData:SharedService,
    private restService:RestService,
    private fns: AngularFireFunctions

  ) { }

  ngOnInit() {
    this.listarRegiones();
    this.order=new OrderBean();
    this.address = new FormControl(''),
    this.reference = new FormControl(''),
    this.phone = new FormControl(''),
    this.destinationRegion= new FormControl(''),
    this.destinationProvince=new FormControl(''),
    this.destinationDistrict=new FormControl(''),

      this.form = this.fb.group({
        'address': this.address,
        'reference': this.reference,
        'phone': this.phone,
        'destinationRegion':this.destinationRegion,
        'destinationProvince':this.destinationProvince,
        'destinationDistrict':this.destinationDistrict,

      });



  }

  enviarOrden() {
    this.order.orderDetailList=[];
    this.order.orderDetailList = this.data.orderDetailList;
    this.order.address = this.form.value['address'];
    this.order.reference = this.form.value['reference'];
    this.order.phone = this.form.value['phone'];
  //  this.order.destinationRegion=this.form.value['destinationRegion'];
   // this.order.destinationProvince=this.form.value['destinationProvince'];
    this.order.destinationDistrict=this.form.value['destinationDistrict'];
    this.order.client = new ClientBean();
    this.order.client=this.sharedData.userSession;
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
          this.snackBar.open(result.responseMessage, 'SUCESS', { duration: 5000 })
          this.orderService.removeItemsCar(this.order.orderDetailList);
          let sumaquantity = 0;
          result.datalist.forEach(element => {
            sumaquantity = sumaquantity + element.quantity;
          });
          this.orderService.totalQuantitySubject.next(this.orderService.totalQuantity-sumaquantity);
          this.orderService.totalQuantity = this.orderService.totalQuantity - sumaquantity;
          this.orderService.getCountItemsCar();

          Swal.fire(
            'Se ha registrado su orden',
            'La orden ha sido enviada.',
            'success'

          );
          this.dialog.open(OrderDetailComponent, {
            width:'33%',
            data: result.datalist
          })

        },error=>{
          //this.snackBar.open(error.responseMessage, 'SUCESS', { duration: 5000 })
          this.restService.message('Error al enviar la orden!', 'Error');
          Swal.fire(
            'No se ha podido registrar su orden',
            'La orden no ha sido enviada.',
            'error'

          );
        })

        this.cerrarDialogo();
      }

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

  public listarRegiones() :Promise<any>{
    return new Promise((resolve,reject)=>{
      this.restService.requestApiRestData("ubigeo/grl", {}).subscribe((result: any) => {
        result.datalist.forEach(ubigeo=>{
          this.regionList.push(ubigeo)
        })
        resolve("success")
      }, error => {
        console.error(error);
      });
    });
  }

  public listarProvinciasSegunIdRegion(event: any) {
    this.order.destinationRegion=event.value.nombreUbigeo
    let params = {
      data: {
        codigoDepartamento: event.value.codigoDepartamento
      }
    }
    this.restService.requestApiRestData("ubigeo/gpbr", params).subscribe((result: any) => {
      this.regionCode = event.value.codigoDepartamento
      this.provinceList = result.datalist;
      this.districtList = [];
    }, error => {
      console.error(error);
    });
  }

  public listarDistritosSegunIdProvincia(event: any) {
    this.order.destinationProvince=event.value.nombreUbigeo
    let params = {
      data: {
        codigoProvincia: event.value.codigoProvincia,
        codigoDepartamento: this.regionCode
      }
    }
    this.restService.requestApiRestData("ubigeo/gdbpr", params).subscribe((result: any) => {
      this.districtList = result.datalist;
    }, error => {
      console.error(error);
    });
  }


}
