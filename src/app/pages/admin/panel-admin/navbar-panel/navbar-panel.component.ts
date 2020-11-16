
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/_model/user';
import { AuthService } from 'src/app/_service/auth.service';
import { CarDiaLogComponent } from '../car-dia-log/car-dia-log.component';
import {MatDialog} from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { SharedService } from 'src/app/_service/shared.service';
import { OrderService } from 'src/app/_service/order.service';

@Component({
  selector: 'app-navbar-panel',
  templateUrl: './navbar-panel.component.html',
  styleUrls: ['./navbar-panel.component.scss']
})
export class NavbarPanelComponent implements OnInit{

  @Input() isMenuOpened: boolean;
  @Output() isShowSidebar = new EventEmitter<boolean>();
  cantidad: number;

  constructor(
    private router: Router,  private userService: AuthService,public dialog: MatDialog,private orderService:OrderService,
    public sharedService:SharedService
   
  ) {
    this.orderService.totalQuantitySubject.subscribe(data=>{
      this.cantidad=data;
    })
  }

  ngOnInit(){

  }
  public openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
    this.isShowSidebar.emit(this.isMenuOpened);
  }

  public signOut(): void {
   this.userService.closeSession();
  }


  public showProduct(nameProduct: string): void{
  this.router.navigate(['order/search',nameProduct]);
}
  openDialogCar(){
    this.dialog.open(CarDiaLogComponent, {
        width: '20%',
        height: '100%',
        position: { right:'0px' },

      });
  }

}
