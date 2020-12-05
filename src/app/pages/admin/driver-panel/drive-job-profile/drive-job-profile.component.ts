import { Component, OnInit } from '@angular/core';

import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import { JobProfileBean } from '../../../../_model/JobProfileBean';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-drive-job-profile',
  templateUrl: './drive-job-profile.component.html',
  styleUrls: ['./drive-job-profile.component.scss']
})
export class DriveJobProfileComponent implements OnInit {

  jobProfileBean: JobProfileBean = new JobProfileBean();

  edit: boolean = false;

  constructor(

    private restService: RestService,
    private sharedService: SharedService,
    public dialogRef: MatDialogRef<DriveJobProfileComponent>,

  ) { }

  ngOnInit(): void {

    this.viewProfile();

  }

  public viewProfile() {

    let param = {
      'id': this.sharedService.userSession.id,
    }

    this.restService.requestApiRestData('jobprofile/gdbi', param)
      .subscribe(
        data => {

          if (data.data != undefined) {
            this.jobProfileBean = data.data;
          }
          //console.log('mi profile laboral in! ', data);
          //console.log('mi profile laboral out! ', this.jobProfileBean);

        }, error => {

          //console.log("Error al ver perfil!", error);
          this.restService.message('Error al ver perfil!', 'Error');
        }
      );

  }

  editProfile() {
    this.edit = true;
  }

  guardarProfile() {

    this.edit = false;

    let param = {
      'data': {
        'id':null,
        'descriptionPerfil': this.jobProfileBean.descriptionPerfil,
        'academicDegree': this.jobProfileBean.academicDegree,
        'currentSituation': this.jobProfileBean.currentSituation,
        'minSalaryAccept': this.jobProfileBean.minSalaryAccept,
        'typeOfAvailability': this.jobProfileBean.typeOfAvailability,
        'typeOfLicense': this.jobProfileBean.typeOfLicense,
        'yearsOfExperience': this.jobProfileBean.yearsOfExperience,
        'driver': {
          'id': this.sharedService.userSession.id,
        }
      }
    }
    if(this.jobProfileBean.id){
      param.data.id=this.jobProfileBean.id;
    }

    this.restService.requestApiRestData('jobprofile/sjp', param)
      .subscribe(
        data => {
          //console.log('Perfil laboral actualizado!', data);
          this.restService.message('Perfil laboral actualizado!', 'UPDATE');
        }, error => {
          //console.log("Error al actualizar perfil laboral!", error);
          this.restService.message('Error al actualizar perfil laboral!', 'Error');
        }
      );

    this.close();

  }

  close() {
    this.dialogRef.close();
  }

}
