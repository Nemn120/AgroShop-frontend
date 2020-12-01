import { Component, OnInit } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';

@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.scss']
})
export class DriverProfileComponent implements OnInit {

  constructor(
   //private active:ActivatedRoute,
   private restService:RestService,
   private sharedService:SharedService,
  ) { }

  ngOnInit(): void {
    //console.log('perfil: ',JSON.parse(this.active.snapshot.params.driver));
  
    this.viewProfile();
  }

  

 
  public viewProfile() {

    let param = {

      "id":1
      /*data: {
        farmerNumber:this.sharedService.userSession.id,
       
      }*/
    }
    this.restService.requestApiRestData('jobprofile/gdbi', param)
      .subscribe(data => {
        console.log('mi profile! ', data);
      }, error => {
        console.log("Error al ver perfil!", error);
        this.restService.message('Error al ver perfil!', 'Error');
      });
  }
}
