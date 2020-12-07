import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {

  idUser : number = 0;
  detail: string;
  isNew: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog : MatDialog,
    private sharedService : SharedService,
    private restService: RestService
  ) { }

  ngOnInit(): void {
  }

  offerPostulate(){
    Swal.fire({
      title: '¿Está seguro de postular a la oferta?',
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
      confirmButtonText: 'Postular'
    }).then((result) => {
      let OfferId = this.data.id;
      this.idUser = this.sharedService.userSession.id;
        let param = {
          data: {
            jobOffer : {
              id: OfferId
            },
            driver: {
              id: this.idUser
            },
            detail: this.detail
          }
        }
        this.restService.requestApiRestData('postulation/afaj',param).subscribe(result =>{
          this.restService.messageChange.next({ message: result.responseMessage, action: "Postulación" });
        })
      this.dialog.closeAll();
    });
  }

  getOfferPostulationStatus(){
    let param = {
      data: 'Aceptado'
    }
    this.restService.requestApiRestData('fpbs',param).subscribe(result =>{
      console.log("Aceptado",result);
    })
  }

}
