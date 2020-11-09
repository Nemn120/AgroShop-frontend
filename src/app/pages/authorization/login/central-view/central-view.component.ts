import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../_service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Credencial {
  usuario: string;
  contraseña: string;
}
@Component({
  selector: 'app-central-view',
  templateUrl: './central-view.component.html',
  styleUrls: ['./central-view.component.scss']
})
export class CentralViewComponent implements OnInit {

  hide = true;
  
 formulario:FormGroup;
  credenciales:Credencial;


  constructor(
    private authService:AuthService,
    private router:Router,
    private builder:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formulario=this.builder.group({
      usuario:['',Validators.required],
      contraseña:['',Validators.required],
    });
  }

  //falta validar credenciales incorrectos(back)
  login(){
    this.credenciales=this.formulario.value as Credencial;
    console.log('credenciales: ',this.credenciales);
    //this.formulario.reset();

    //this.authService.login('farmer2','123');
    this.authService.login(this.credenciales.usuario,this.credenciales.contraseña);
  }
  registry(){
    this.router.navigate(['auth/registry']);
  }



}
