import { Component, OnInit } from '@angular/core';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  src:string;
}
@Component({
  selector: 'app-right-banner',
  templateUrl: './right-banner.component.html',
  styleUrls: ['./right-banner.component.scss']
})
export class RightBannerComponent implements OnInit {

  
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: '#193B01',src:'/assets/images/login/vegetables/avocado.svg'},
    {text: 'Two', cols: 1, rows: 2, color: '#193B01',src:'/assets/images/login/vegetables/broccol.svg'},
    {text: 'Three', cols: 1, rows: 1, color: '#193B01',src:'/assets/images/login/vegetables/Carrot.svg'},
    {text: 'Four', cols: 2, rows: 1, color: '#193B01',src:'/assets/images/login/vegetables/lettuce.svg'},
    {text: 'One', cols: 3, rows: 1, color: '#193B01',src:'/assets/images/login/vegetables/potato.svg'},
    {text: 'Two', cols: 1, rows: 2, color: '#193B01',src:'/assets/images/login/vegetables/onion.svg'},
    {text: 'Three', cols: 1, rows: 1, color: '#193B01',src:'/assets/images/login/vegetables/peas.svg'},
    {text: 'Four', cols: 2, rows: 1, color: '#193B01',src:'/assets/images/login/vegetables/tomato.svg'},
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
