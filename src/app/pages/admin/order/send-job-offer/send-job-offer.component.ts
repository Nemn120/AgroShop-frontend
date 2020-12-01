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
   order: OrderBean;
   form: FormGroup;
   title: FormControl;
   description: FormControl;
   requirements: FormControl;
   departmentOrigin: FormControl;
   shippingCost:FormControl;
   finalDate:Date;

  constructor(
    public dialog: MatDialog, public dialogo: MatDialogRef<SendJobOfferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderBean,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogMap: MatDialog,
    private sharedData:SharedService,
    private restService:RestService
  ) { }

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
    //this.jobOffer.order.id=this.data.id; 
    //this.jobOffer.userCreateId=this.data.client.user.id; 
  }

}
