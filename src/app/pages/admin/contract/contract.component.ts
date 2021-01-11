import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { RestService } from 'src/app/_service/rest.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  constructor(
    private restService: RestService
  ) { }

  ngOnInit(): void {
  }

  dowloadContract(id: number): void {
    const param = {
      data: id
    };
    console.log(param);
    this.restService.requestApiRestData('api/contrato/dcontract', param).subscribe(resp => {
      console.log(resp);
      // const bytes = new Uint8Array(resp.data);
      const file = new Blob([resp.data], { type: 'application/msword'});
      const nameFile = 'contract.docx';
      saveAs(file, nameFile);
    }, err => {
      console.log(err);
    });

  }

}
