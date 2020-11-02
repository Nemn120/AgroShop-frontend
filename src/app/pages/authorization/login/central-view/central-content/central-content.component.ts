import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-central-content',
  templateUrl: './central-content.component.html',
  styleUrls: ['./central-content.component.scss']
})
export class CentralContentComponent implements OnInit {

  hide = true;
  
  constructor() { }

  ngOnInit(): void {
  }

}
