import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { UbigeoBean } from 'src/app/_model/UbigeoBean';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  form: FormGroup;
  id : number;
  labelFile: string;
  selectedFiles: FileList;
  imagenData: any;
  currentFileUpload: File;
  imagenEstado: boolean = false;
  districtList:UbigeoBean[]=[];
  provinceList:UbigeoBean[]=[];
  regionList:UbigeoBean[]=[];
  regionCode:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder : FormBuilder,
    private restService: RestService,
    private sharedService: SharedService,
    private sanitization: DomSanitizer,
    private dialogRef: MatDialog
  ) { this.buildForm()}

  

  ngOnInit(): void {
    this.listarRegiones();
    this.restService.getUserPhoto(this.data.id).subscribe(data => {
      if (data.size > 0){
        this.imagenData = this.convertir(data);
        this.imagenEstado = true;
      }
    }, error => {
      this.restService.message('Error al mostrar imagen!', 'Error');
    });
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      name : [this.data.name,[Validators.required]],
      lastName : [this.data.lastName,[Validators.required]],
      address : [this.data.address,[Validators.required]],
      phone : [this.data.cellPhone,[Validators.required,Validators.maxLength(9),Validators.minLength(8)]],
      email : [this.data.email,[Validators.email,Validators.required]],
      region : [this.data.region,[Validators.required]],
      province : [this.data.province,[Validators.required]],
      district : [this.data.district,[Validators.required]]
    });
  }

  public listarRegiones() :Promise<any>{
    return new Promise((resolve,reject)=>{
      this.restService.requestApiRestData("ubigeo/grl", {}).subscribe((result: any) => {
        result.datalist.forEach(ubigeo=>{
          this.regionList.push(ubigeo);
        })
        resolve("success")
      }, error => {
        console.error(error);
      });
    });
  }

  public listarProvinciasSegunIdRegion(event: any) {
    let params = {
      data: {
        codigoDepartamento: event.value.codigoDepartamento
      }
    }
    this.restService.requestApiRestData("ubigeo/gpbr", params).subscribe((result: any) => {
      this.regionCode = event.value.codigoDepartamento
      this.provinceList = result.datalist;
      this.districtList = [];
    }, error => {
      console.error(error);
    });
  }

  public listarDistritosSegunIdProvincia(event: any) {
    let params = {
      data: {
        codigoProvincia: event.value.codigoProvincia,
        codigoDepartamento: this.regionCode
      }
    }
    this.restService.requestApiRestData("ubigeo/gdbpr", params).subscribe((result: any) => {
      this.districtList = result.datalist;
    }, error => {
      console.error(error);
    });

  }

  editProfile(save: Event){
    if(this.form.valid){
      Swal.fire({
        title: 'Editar Usuario',
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
        confirmButtonText: 'Editar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.id = this.sharedService.userSession.user.id;
        const value = this.form.value;
        console.log(value);
        let param = {
          data : {
            id : this.id,
            name : value.name,
            lastName : value.lastName,
            address : value.address,
            cellPhone : value.phone,
            email : value.email,
            region : value.region.nombreUbigeo,
            province : value.province.nombreUbigeo,
            district : value.district
          }
        }
        if (this.selectedFiles != null) {
          this.currentFileUpload = this.selectedFiles.item(0);
        } else {
        this.currentFileUpload = new File([""], "blanco");
        }
        this.restService.requestApiRestData('user/uu',param,this.currentFileUpload).subscribe(result =>{
          this.restService.messageChange.next({ message: 'Se actualizó el perfil', action: result.responseCode });
          console.log(param);
        })
        this.dialogRef.closeAll();
        }

      });
    }
    
  }

  selectFile(e: any) {
    this.labelFile = e.target.files[0].name;
    this.selectedFiles = e.target.files;
  }

  public convertir(data: any) {
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      let base64 = reader.result;
      this.sanar(base64);
    }
  }

  public sanar(base64: any) {
    this.imagenData = this.sanitization.bypassSecurityTrustResourceUrl(base64);
  }

}


