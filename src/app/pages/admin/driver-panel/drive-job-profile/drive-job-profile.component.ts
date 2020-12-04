import { Component, OnInit } from '@angular/core';

import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import { JobProfileBean } from '../../../../_model/JobProfileBean';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-drive-job-profile',
  templateUrl: './drive-job-profile.component.html',
  styleUrls: ['./drive-job-profile.component.scss']
})
export class DriveJobProfileComponent implements OnInit {

  jobProfileBean: JobProfileBean;

  edit:boolean=false;

  constructor(
    private restService: RestService,
    private sharedService: SharedService,
    public dialogRef: MatDialogRef<DriveJobProfileComponent>,
  ) { }

  ngOnInit(): void {
    this.jobProfileBean=new JobProfileBean();
    this.viewProfile();

  }

  public viewProfile() {

    let param = {
      'id': this.sharedService.userSession.id,
    }

    this.restService.requestApiRestData('jobprofile/gdbi', param)
      .subscribe(
        data => {

          this.jobProfileBean=data.data;
          //console.log('mi profile laboral in! ', data);
          console.log('mi profile laboral out! ', this.jobProfileBean);

        }, error => {

          console.log("Error al ver perfil!", error);
          this.restService.message('Error al ver perfil!', 'Error');
        }
      );
  }

  editProfile(){
    this.edit=true;
  }
  guardarProfile(){
    this.edit=false;
  }
  close(){
    this.dialogRef.close();
  }

}
