import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/_model/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();
  @Input() user: User;
  public flatlogicEmail: string = "https://flatlogic.com";
  constructor() { }

  public signOutEmit(): void {
    this.signOut.emit();
  }

}
