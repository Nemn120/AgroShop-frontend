import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestService } from 'src/app/_service/rest.service';
import { OrderBean } from '../../../../_model/OrderBean';
import { OrderListComponent } from '../order-list/order-list.component';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  labelFile: string;
  imagenEstado = false;
  imagenData: any;
  url: any = '../../../../../assets/images/upload.jpg';

  constructor(
    private restService: RestService,
    @Inject(MAT_DIALOG_DATA) public data: OrderBean,
    public dialogRef: MatDialogRef<OrderListComponent>,
  ) { }

  ngOnInit(): void {
  }

  confirmArrivedOrder() {

    if (this.selectedFiles != null) {
      this.currentFileUpload = this.selectedFiles.item(0);
    } else {
      this.currentFileUpload = new File([''], 'blanco');
    }

    const formData = new FormData();
    formData.append('file', this.currentFileUpload);

    this.restService.requestApiRestData(`order/cao/${this.data.id}`, formData).subscribe(result => {
        this.restService.messageChange.next(result.responseMessage);
    });
    this.dialogRef.close();
  }

  selectFile(e: any) {
    this.labelFile = e.target.files[0].name;
    this.selectedFiles = e.target.files;

    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      };

      reader.readAsDataURL(e.target.files[0]);
    }

  }

}
