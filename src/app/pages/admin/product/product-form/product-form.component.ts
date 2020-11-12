import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductBean } from '../../../../_model/ProductBean';
import { RestService } from '../../../../_service/rest.service';
import { CategoryProductBean } from '../../../../_model/CategoryProductBean';
import { SharedService } from '../../../../_service/shared.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productSelect: ProductBean;
  categorias: CategoryProductBean[];
  estados: String[]=['Activo','Desactivo'];


  imagenData: any;
  imagenEstado: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  labelFile: string;

  constructor(
    private restService: RestService,
    private sharedService:SharedService,

    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductBean,

    private sanitization: DomSanitizer,

  ) { }


  ngOnInit(): void {
   
    this.listCategories();

    this.productSelect = new ProductBean();
    this.productSelect.userCreateId = this.sharedService.userSession.id;
    console.log('this.productSelect: ',this.productSelect);
    if (this.data.id > 0) {
      this.productSelect.id = this.data.id;
      this.productSelect.name = this.data.name;
      this.productSelect.description = this.data.description;
      this.productSelect.category = this.data.category;
/*
      let param = { 
          'id': 28,
        
      };*/
      let param = { 
        'id':this.productSelect.id,
      
    };
      this.restService.requestApiRestData('product/gp', param).subscribe(data => {
        console.log('imagen: ',data);
        if (data.size > 0)
          this.imagenData = this.convertir(data);
      });
  
    }


  }
  save() {
    /*
    let param = {
      data: {
        id: 28,
        name: "Sal",
        status: 'Activo',
        userCreateId: 1,
        category: {
          id: 1
        }
      }
    }*/
    
   
    let param = {
      data: this.productSelect,
    }

    if (this.selectedFiles != null) {
      this.currentFileUpload = this.selectedFiles.item(0);
    } else {
      this.currentFileUpload = new File([""], "blanco");
    }
    this.restService.requestApiRestData('product/sp', param, this.currentFileUpload).subscribe(result => {
      console.log('result: ',result);

      if (this.productSelect.id) {
        this.restService.messageChange.next({ message: 'Producto actualizado con exito!', action: "Update" });
      }
      else {
        this.restService.messageChange.next({ message: 'Producto agregado con exito!', action: "Create" });
      }

    }, error => {
      console.log("Error al agregar producto! ", error);
      this.restService.message('Error al agregar producto!', 'Error');
    });
    this.closeDialog();
  }


  listCategories() {
    let param = {
      data: {
        userCreateId: 1
      }
    }
    this.restService.requestApiRestData('categoryproduct/gcp', param).subscribe(data => {
      console.log('categorias: ', data);
      this.categorias = data.datalist;
    });
  }


  closeDialog(): void {
    this.dialogRef.close();
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
    this.imagenEstado = true;
  }

}
/*
@PostMapping(path="/glpbf")
	public GenericResponse<ProductEntity> getListProductByFarmer(@RequestBody GenericRequest<ProductEntity> request){
		
		GenericResponse<ProductEntity> response = new GenericResponse<ProductEntity>();
		try {
			response.setDatalist(productService.getListProductByFarmer(request.getData().getUserCreateId()));
			response.setResponseMessage("productos mostrados exitosamente");
			response.setFinalTimesTamp(LocalDateTime.now());
			response.setResponseCode(AbstractResponse.SUCCESS);
		}catch(Exception e) {
			response.setResponseMessage("Error al mostrar productos");
			response.setResponseCode(AbstractResponse.ERROR);
		}
		
		return response;
	}
	
	@PostMapping(path = "/gp", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
	public GenericResponse<byte[]> getPhoto(@RequestBody GenericRequest<ProductEntity> request) {
		GenericResponse<byte[]> response = new GenericResponse<byte[]>();
		try {
			ProductEntity c = productService.getOneById(request.getId());
			response.setData(c.getPhoto());
			response.setResponseMessage("foto obtenida exitosamente");
			response.setFinalTimesTamp(LocalDateTime.now());
			response.setResponseCode(AbstractResponse.SUCCESS);
		}catch(Exception e) {
			response.setResponseMessage("Error al mostrar foto");
			response.setResponseCode(AbstractResponse.ERROR);
		}
		
		return response;
	}*/