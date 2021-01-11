import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {


  private urlPlace = `${environment.HOST_MAPBOX}/geocoding/v5/mapbox.places`;
  
  constructor(private httpClient: HttpClient) { }

  //OBTENCION DEL LUGAR APARTIR COORDENADAS
  getPlace(long: number, lat: number): Observable<any> {
    return this.httpClient.get<any>(`${this.urlPlace}/${long},${lat}.json?types=poi&access_token=${environment.TOKEN_MAPBOX}`);
  }

}
