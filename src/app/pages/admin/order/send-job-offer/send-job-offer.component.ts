import { Component, OnInit, Inject } from '@angular/core';
import { JobOfferBean } from 'src/app/_model/JobOfferBean';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { OrderBean } from '../../../../_model/OrderBean';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/_service/shared.service';
import { RestService } from 'src/app/_service/rest.service';

@Component({
  selector: 'app-send-job-offer',
  templateUrl: './send-job-offer.component.html',
  styleUrls: ['./send-job-offer.component.scss']
})
export class SendJobOfferComponent implements OnInit {
   jobOffer: JobOfferBean;
   form: FormGroup;
   title: FormControl;
   description: FormControl;
   requirements: FormControl;
   departmentOrigin: FormControl;
   shippingCost:FormControl;
   finalDate:Date;
   action: string = 'SUCCESS';
   minDate: Date;
   dept: string[] = ['Amazonas','Ancash','Apurimac','Arequipa',' Ayacucho',
  'Cajamarca','Callao','Cuzco','Huancavelica','Huanuco','Ica','Junin','La Libertad', 'Lambayeque',
  'Lima','Loreto','Madre de Dios','Moquegua','Pasco','Piura','Puno','San Martin','Tacna','Tumbes','Ucayali'];
  constructor(
    public dialog: MatDialog, public dialogo: MatDialogRef<SendJobOfferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderBean,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private sharedData:SharedService,
    private restService:RestService
  ) { 
    const currentyear = new Date().getFullYear();
    const currentmonth = new Date().getMonth();
    const currentday = new Date().getDay();
        this.minDate = new Date(currentyear,currentmonth,currentday );
  }

  ngOnInit(): void {
    
      this.jobOffer = new JobOfferBean();
      this.title = new FormControl(''),
      this.description = new FormControl(''),
      this.requirements = new FormControl(''),
      this.departmentOrigin = new FormControl(''),
      this.shippingCost = new FormControl(''),
      this.finalDate = new Date(),

      this.form = this.fb.group({
        'title': this.title,
        'description': this.description,
        'requirements': this.requirements,
        'departmentOrigin': this.departmentOrigin,
        'shippingCost': this.shippingCost,
        'finalDate': this.finalDate,

      });

  }

  publicarOferta(){
    this.jobOffer= new JobOfferBean();
    this.jobOffer.order = this.data;
    this.jobOffer.title = this.form.value['title'];
    this.jobOffer.description = this.form.value['description'];
    this.jobOffer.requirements = this.form.value['requirements'];
    this.jobOffer.shippingCost=this.form.value['shippingCost'];
    this.jobOffer.departmentOrigin=this.form.value['departmentOrigin'];
    this.jobOffer.finalDate=this.form.value['finalDate'];
    Swal.fire({
      title: 'Esta seguro de publicar la oferta laboral?',
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
      confirmButtonText: 'Publicar oferta'
    }).then((result) => {
      if (result.isConfirmed) {
        let param={
          data:this.jobOffer
        }
        this.restService.requestApiRestData('joboffer/po',param).subscribe(result=>{
           this.restService.messageChange.next({ message: result.responseMessage, action:this.action });       
          //this.snackBar.open(result.responseMessage, 'SUCESS', { duration: 5000 })

        },error=>{
          //this.snackBar.open(error.responseMessage, 'SUCESS', { duration: 5000 })
          this.restService.messageChange.next({ message: error.responseMessage, action: "ERROR" });
        })
        setTimeout (x=>{
          this.dialog.closeAll();
        },2000);
      }

    });

  }

  closeDialog(): void {
    this.dialogo.close();
  }
}
