import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageBean } from './../_model/MessageBean';
import { Subject } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class RestService {

  messageChange = new Subject<MessageBean>();

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


   getPhotoById(id: number){
     return this.http.get(`${this.urlHost}product/gp/${id}`,{
       responseType: 'blob'
     });
   }

   message(message: string, action: string) {

    this._snackBar.open(message, action, {
      duration: 2000,
    });

  }

  getPhoto(id: number){
    return this.http.get(`${this.urlHost}vehicle/gp/${id}`,{
      responseType: 'blob'
    });
   }

}
