import { Component, OnInit, Inject } from '@angular/core';
import { JobOfferBean } from 'src/app/_model/JobOfferBean';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { OrderBean } from '../../../../_model/OrderBean';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { RestService } from 'src/app/_service/rest.service';
import { UbigeoBean } from 'src/app/_model/UbigeoBean';
import { PlaceBean } from 'src/app/_model/PlaceBean';
import { JobOfferMapComponent } from '../../map/job-offer-map/job-offer-map.component';
import { MapService } from '../../../../_service/map.service';

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
   originProvince: FormControl;
   originRegion: FormControl;
   originDistrict: FormControl;
   shippingCost:FormControl;
   finalDate:Date;
   action: string = 'SUCCESS';
   minDate: Date;
   districtList:UbigeoBean[]=[];
   provinceList:UbigeoBean[]=[];
   regionList:UbigeoBean[]=[];
   regionCode:string;

   direccion:string='';
   
  constructor(
    public dialog: MatDialog, public dialogo: MatDialogRef<SendJobOfferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderBean,
    private fb: FormBuilder,
    private restService:RestService,
    private mapService:MapService
  ) { 
    const currentyear = new Date().getFullYear(); 
    const currentmonth = new Date().getMonth();
    const currentday = new Date().getDate();
        this.minDate = new Date(currentyear,currentmonth,currentday );
  }

  ngOnInit(): void {
      this.listarRegiones();
      this.jobOffer = new JobOfferBean();
      this.title = new FormControl(''),
      this.description = new FormControl(''),
      this.requirements = new FormControl(''),
      this.originRegion = new FormControl(''),
      this.originProvince = new FormControl(''),
      this.originDistrict = new FormControl(''),
      this.shippingCost = new FormControl(''),
      this.finalDate = new Date(),

      this.form = this.fb.group({
        'title': this.title,
        'description': this.description,
        'requirements': this.requirements,
        'originRegion': this.originRegion,
        'originProvince': this.originProvince,
        'originDistrict': this.originDistrict,
        'shippingCost': this.shippingCost,
        'finalDate': this.finalDate,

      });
/*
      this.jobOffer.originPlace=new PlaceBean();
      this.jobOffer.originPlace.name='desconocido';
      this.jobOffer.originPlace.longitude=0;
      this.jobOffer.originPlace.latitude=0;
*/
      //Add destiny place
      this.mapService.jobOfferPlaceChange.subscribe(data => {
        console.log('direccion recibida: ',data);
        this.direccion=data.name;
        this.jobOffer.originPlace=new PlaceBean();
        this.jobOffer.originPlace.name=data.name;
        this.jobOffer.originPlace.longitude=data.longitude;
        this.jobOffer.originPlace.latitude=data.latitude;
      });

  }

  publicarOferta(){
    
    this.jobOffer.order = this.data;
    this.jobOffer.title = this.form.value['title'];
    this.jobOffer.description = this.form.value['description'];
    this.jobOffer.requirements = this.form.value['requirements'];
    this.jobOffer.shippingCost=this.form.value['shippingCost'];
    this.jobOffer.originDistrict=this.form.value['originDistrict'];
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

           console.log('jobOffer with place: ',result);

        },error=>{
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
    this.jobOffer.originRegion=event.value.nombreUbigeo;
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
    this.jobOffer.originProvince=event.value.nombreUbigeo
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

   //open job offer map 
   openJobOfferMap(){
    this.dialog.open(JobOfferMapComponent, {
      width: '50%',
      height: '70%',
    });
  }
}
