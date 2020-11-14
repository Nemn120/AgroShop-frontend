import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  urlHost: string = environment.HOST+'/';

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
  ){ }

   
   requestApiRestData(path:string, param:any,file?:File){
     let paramApi;
     if(file){
      let formdata: FormData = new FormData();
      formdata.append('file', file);
      const requestBlob = new Blob([JSON.stringify(param)], { type: "application/json" });
      formdata.append('request', requestBlob);
      paramApi=formdata;
     }else{
      paramApi=param;
     }
     path=this.urlHost.concat(path);
    return this.http.post<any>(path,paramApi);
   }

   //messages
  message(message: string, action: string) {

    this._snackBar.open(message, action, {
      duration: 2000,
    });

  }

}
