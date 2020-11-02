
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/_model/user';
import { AuthService } from 'src/app/_service/auth.service';
import { CarDiaLogComponent } from '../car-dia-log/car-dia-log.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-navbar-panel',
  templateUrl: './navbar-panel.component.html',
  styleUrls: ['./navbar-panel.component.scss']
})
export class NavbarPanelComponent {

  @Input() isMenuOpened: boolean;
  @Output() isShowSidebar = new EventEmitter<boolean>();
  public user$: Observable<User>
  public emails$: Observable<any[]>

  constructor(
    private router: Router,  private userService: AuthService,public dialog: MatDialog,
  ) {
    this.user$ = this.userService.getUser();
  }

  public openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
    this.isShowSidebar.emit(this.isMenuOpened);
  }

  public signOut(): void {
   console.log("SALIR");
  }

  openDialogCar(){
   
    this.dialog.open(CarDiaLogComponent, {
        width: '60%',
        height: '80%',
      });
  }

}
