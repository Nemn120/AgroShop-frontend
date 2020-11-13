import { Component, OnInit ,Inject} from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CategoryProductBean } from '../../../../../_model/CategoryProductBean';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  titulo:string="Nueva ";
  categorySelect: CategoryProductBean;

  constructor(
    private restService: RestService,
    private sharedService:SharedService,

    public dialogRef: MatDialogRef<CategoriesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryProductBean,
    
  ) { }

  ngOnInit(): void {

    this.categorySelect = new CategoryProductBean();
    this.categorySelect.userCreateId = this.sharedService.userSession.id;
    
    console.log('categorySelect: ',this.categorySelect);
   
    if (this.data.id > 0) {
      this.categorySelect.id = this.data.id;
      this.categorySelect.name = this.data.name;
      this.categorySelect.description = this.data.description;

      this.titulo="Actualizar ";
    }


  }
  save() {
  
    let param = {
      data: this.categorySelect,
    }

 
    this.restService.requestApiRestData('categoryproduct/scp', param,).subscribe(result => {
      console.log('result: ',result);

      if (this.categorySelect.id) {
        this.restService.messageChange.next({ message: 'Categoria actualizado con exito!', action: "Update" });
      }
      else {
        this.restService.messageChange.next({ message: 'Categoria agregado con exito!', action: "Create" });
      }

    }, error => {
      console.log("Error al agregar categoria! ", error);
      this.restService.message('Error al agregar categoria!', 'Error');
    });
    this.closeDialog();
  }
  
  closeDialog(): void {
    this.dialogRef.close();
  }

}
