import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/_service/rest.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {

  imageSelected: File;
  src: any = '../../../../../assets/images/fruta.jpg';

  constructor(
    private restService: RestService,
   //  @Inject(MAT_DIALOG_DATA) public data: OrderBean,
   //  public dialogRef: MatDialogRef<OrderListComponent>,
  ) { }

  ngOnInit(): void {
  }

  confirmArrivedOrder(image: File, id: number) {


    const formData = new FormData();
    formData.append('file', image);

    let path = `order/cao/${id}`;

    this.restService.requestApiRestData(path, formData).subscribe(data => {
      console.log(data);
      this.src = data.data;
    });

  }

  selectImage(event): void {
    this.imageSelected = event.target.files[0];
    console.log(this.imageSelected);
    if (this.imageSelected.type?.indexOf('image') < 0) {
      swal.fire('Error image selected: ', 'The file is not a image', 'error');
      this.imageSelected = null;
    }
    if(event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.src =  reader.result;
      reader.readAsDataURL(file);
    }
  }

  uploadImage(): void {
    if (!this.imageSelected) {
      swal.fire('Error upload: ', 'You are not selected a photo', 'error');
    } else {
      this
        .confirmArrivedOrder(this.imageSelected, 1)
            swal.fire(
              'Upload image successfully!',
              'success'
            );
    }
  }

}
