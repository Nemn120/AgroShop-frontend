import { MaterialModule } from 'src/app/_material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [DialogoConfirmacionComponent],
  imports: [
    
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports:[
   DialogoConfirmacionComponent
  ],
  
 
})
export class SharedModule { }