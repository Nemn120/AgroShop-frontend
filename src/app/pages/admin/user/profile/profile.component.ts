import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ProductSalesBean } from 'src/app/_model/ProductSalesBean';
import { UserModify } from 'src/app/_model/UserModify';
import { AuthService } from 'src/app/_service/auth.service';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  id : number;
  user : UserModify = new UserModify();
  imagenEstado: boolean = false;
  imagenData: any;
  productSalesList:ProductSalesBean[]=[];
  idPassed : number;
  comparator : boolean = false;
  idFarmer : number;

  constructor(
    private restService: RestService, private sharedService: SharedService,public dialog: MatDialog, private sanitization: DomSanitizer,
    private _activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.receivingData();
    this.restService.messageChange.subscribe(data => {
      this.showData();
      this.restService.message(data.message, data.action);
    });
  }

  showData(){
    this.id = this.idPassed;
    let param = {
      id : this.id
    }
    this.restService.requestApiRestData('user/gubi',param).subscribe(result =>{
      this.user = result.data;
      this.restService.getUserPhoto(this.id).subscribe(data => {
        if (data.size > 0)
          this.imagenData = this.convertir(data);
      }, error => {
        this.restService.message('Error al mostrar imagen!', 'Error');
      });
    })
    
  }

  editProfile(){
    this.dialog.open(ProfileEditComponent, {
      data: this.user,
      width: '50%',
      maxHeight: '70%',
    });
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
    this.imagenEstado = true;
  }

  public listProductSales() {
    let param = {
      data: {
        farmerNumber:this.idFarmer,
        status:'Activo'
      }
    }
    this.restService.requestApiRestData('productsales/glpsbfas', param)
      .subscribe(data => {
        this.activatedPhoto(data.datalist);
        this.productSalesList=data.datalist; 
      }, error => {
        console.log("Error al listar productos venta!", error);
        this.restService.message('Error al listar productos venta!', 'Error');
      });
  }

  activatedPhoto(data:any){
    for(const m of data){
      this.restService.getPhotoById(m.product.id).subscribe(photo=>{
        const reader = new FileReader();
        reader.readAsDataURL(photo);
        reader.onloadend = () =>{
          const base64 = reader.result;
          m.product._foto = this.setterPhoto(base64);
          m.product._isFoto = true;
        };

      });
    }
  }

 public setterPhoto(data:any){
    return this.sanitization.bypassSecurityTrustResourceUrl(data);
  }

  receivingData(){
    this._activatedRoute.params.subscribe(params => {
      this.idPassed = parseInt(params['id']);
      this.idFarmer = parseInt(params['idFarmer']);
      this.listProductSales();
      this.showData();
      this.compareID();
    })
  }

  compareID(){
    if(this.sharedService.userSession.id == this.idFarmer){
      this.id = this.sharedService.userSession.user.id;
      this.comparator = true;
      console.log("ID: ",this.id);
      console.log("IDPASSED: ",this.idPassed);
    }
  }

}
