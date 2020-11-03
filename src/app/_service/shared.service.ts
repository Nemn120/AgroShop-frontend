import { Injectable } from '@angular/core';
import { UserBean } from '../_model/UserBean';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  userSession: UserBean;
  constructor() { }
}
