import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/_model/user';
import { SharedService } from 'src/app/_service/shared.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();
  public flatlogicEmail: string = "https://flatlogic.com";
  user:any;
  constructor(
    private sharedService:SharedService
  ) { }
    ngOnInit(){
      this.user=this.sharedService.userSession.user;
      console.log(this.user);
    }
  public signOutEmit(): void {
    this.signOut.emit();
  }

}
