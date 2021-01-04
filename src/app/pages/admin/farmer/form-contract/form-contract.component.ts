import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContractBean } from 'src/app/_model/ContractBean';
import { PostulationBean } from 'src/app/_model/PostulationBean';
import { RestService } from 'src/app/_service/rest.service';
import { PostulationListComponent } from '../../postulation/postulation-list/postulation-list.component';


@Component({
  selector: 'app-form-contract',
  templateUrl: './form-contract.component.html',
  styleUrls: ['./form-contract.component.scss']
})
export class FormContractComponent {

  contract = new ContractBean();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PostulationBean,
    public dialogRef: MatDialogRef<PostulationListComponent>,
    private restService: RestService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public generateContract(): void {
    const post = new PostulationBean();
    post.id = this.data.id;
    this.contract.postulation = post;

    const param = {
      data: this.contract
    };

    this.restService.requestApiRestData('api/contrato/rcontract', param)
      .subscribe( data => {
          this.restService.message(data.responseMessage, 'Info');
    });

    console.log(param);
  }

}
