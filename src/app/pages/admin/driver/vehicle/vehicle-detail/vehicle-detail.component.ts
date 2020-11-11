import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/_service/rest.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {

  constructor(
    private restService: RestService
  ) { }

  ngOnInit(): void {
  }

}
