import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  src:string;
}

@Component({
  selector: 'app-left-banner',
  templateUrl: './left-banner.component.html',
  styleUrls: ['./left-banner.component.scss']
})
export class LeftBannerComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: '#193B01',src:'/assets/images/login/fruts/strawberry.svg'},
    {text: 'Two', cols: 1, rows: 2, color: 'l#193B01',src:'/assets/images/login/fruts/banana.svg'},
    {text: 'Three', cols: 1, rows: 1, color: '#193B01',src:'/assets/images/login/fruts/coconut.svg'},
    {text: 'Four', cols: 2, rows: 1, color: '#193B01',src:'/assets/images/login/fruts/manzana.svg'},
    {text: 'One', cols: 3, rows: 1, color: '#193B01',src:'/assets/images/login/fruts/watermelon.svg'},
    {text: 'Two', cols: 1, rows: 2, color: 'l#193B01',src:'/assets/images/login/fruts/tangerine.svg'},
    {text: 'Three', cols: 1, rows: 1, color: '#193B01',src:'/assets/images/login/fruts/89_85216.svg'},
    {text: 'Four', cols: 2, rows: 1, color: '#193B01',src:'/assets/images/login/fruts/Pineapple.svg'},
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
