import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VehicleEntity } from 'src/app/_model/VehicleEntity';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {

  idUser : number;

  constructor(
    private restService: RestService,
    @Inject(MAT_DIALOG_DATA) public data: VehicleEntity,
    private sanitization: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.convertir(this.data);
  }

  public setColorStatus(status : string):string{
    switch(status){
      case 'Disponible': return '#0B8F48';
      case 'Malogrado' : return '#CD6804';
      case 'Ocupado' : return '#055387';
      default : return '#000000';
    }
  }

  public convertir(data: any) {
    this.restService.getPhoto(data.id).subscribe(photo =>{
      let reader = new FileReader();
        reader.readAsDataURL(photo);
        reader.onloadend = () => {
        const base64 = reader.result;
        data.photo = this.sanar(base64);
      }
    })
  }

  public sanar(data : any){
    return this.sanitization.bypassSecurityTrustResourceUrl(data);
  }
}
