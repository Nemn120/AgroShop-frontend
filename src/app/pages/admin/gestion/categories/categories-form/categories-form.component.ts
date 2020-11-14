import { Component, OnInit ,Inject} from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CategoryProductBean } from '../../../../../_model/CategoryProductBean';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  titulo:string="Nueva ";
  categorySelect: CategoryProductBean;

  formulario:FormGroup;

  constructor(
    private restService: RestService,
    private sharedService:SharedService,

    public dialogRef: MatDialogRef<CategoriesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryProductBean,

    private builder:FormBuilder,
    
  ) { }

  ngOnInit(): void {
    this.categorySelect = new CategoryProductBean();
    this.crearFormulario();
  }


  crearFormulario(){
    this.formulario=this.builder.group({
      name:['',Validators.required],
      description:[''],
    });

    if (this.data.id > 0) {
      this.formulario.setValue({
        name:this.data.name,
        description:this.data.description,
      });
      this.titulo="Actualizar ";
    }
  }

  save() {
    this.categorySelect=this.formulario.value as CategoryProductBean;
    this.categorySelect.userCreateId=this.sharedService.userSession.id;
    if(this.data.id > 0){
      this.categorySelect.id=this.data.id;
    }
    console.log('guardar?: ',this.formulario.value);
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

  getErrorMessage() {
    if (this.formulario.controls['name'].hasError('required')) {
      return 'Campo requerido';
    }
  }
}
