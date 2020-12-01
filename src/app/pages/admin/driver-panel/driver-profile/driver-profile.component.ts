import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.scss']
})
export class DriverProfileComponent implements OnInit {

  constructor(
   private active:ActivatedRoute

  ) { }

  ngOnInit(): void {
    console.log('perfil: ',JSON.parse(this.active.snapshot.params.driver));
  }

}
