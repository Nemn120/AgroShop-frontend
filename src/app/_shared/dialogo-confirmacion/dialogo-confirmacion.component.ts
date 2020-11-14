import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Message } from '../../_DTO/messageDTO';

@Component({
  selector: 'app-dialogo-confirmacion',
  templateUrl: './dialogo-confirmacion.component.html',
  styleUrls: ['./dialogo-confirmacion.component.scss']
})
export class DialogoConfirmacionComponent implements OnInit {

  constructor(
    public dialogo: MatDialogRef<DialogoConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: Message,
    private fb: FormBuilder,
    
    ) { }

    cerrarDialogo(): void {
      this.dialogo.close(false);
    }
    confirmado(): void {

      this.dialogo.close(true);
    }
 

  ngOnInit() {

  }

}
