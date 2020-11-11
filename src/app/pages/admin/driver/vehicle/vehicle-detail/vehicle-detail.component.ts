import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {

  idUser : number;

  constructor(
    private restService: RestService,
    private sharedService : SharedService
  ) { }

  ngOnInit(): void {
    this.idUser = this.sharedService.userSession.id;
    let param = {
      data:{
        driver:{
          id : this.idUser
        }
      }
    }
    this.restService.requestApiRestData('vehicle/gvlbd',param).subscribe(result =>{
      console.log("carros: ",result);
    })
  }

}
