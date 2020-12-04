import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/_model/user';
import { SharedService } from 'src/app/_service/shared.service';
import { DriveJobProfileComponent } from '../../driver-panel/drive-job-profile/drive-job-profile.component';
import { FamerMapComponent } from '../.././map/famer-map/famer-map.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();
  public flatlogicEmail: string = "https://flatlogic.com";
  user: any;
  constructor(
    private sharedService: SharedService,
    public dialog: MatDialog,
  ) { }
  ngOnInit() {
    this.user = this.sharedService.userSession.user;
    console.log(this.user);
  }
  public signOutEmit(): void {
    this.signOut.emit();
  }


  open() {
    if(this.user.typeUser=='DRIVER'){
      this.dialog.open(DriveJobProfileComponent, {});
    }
    this.dialog.open(FamerMapComponent);
    
    //[routerLink]="['/driver/profileJob']"
    //this.router.navigate(['driver/profile',{driver:JSON.stringify(driver)}]);
  }

}
