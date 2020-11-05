import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { User } from '../_model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public login(): void {
    localStorage.setItem('token', 'token');
  }

  public sign(): void {
    localStorage.setItem('token', 'token');
  }

  public signOut(): void {
    localStorage.removeItem('token');
  }

  public getUser(): Observable<User> {
    return of({
      name: 'Nombre',
      lastName: 'Apellido',
      email: 'agroshop@gmail.com'
    });
  }
}
