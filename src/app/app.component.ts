import { Component } from '@angular/core';
import { MenuOptionBean } from './_model/MenuOptionBean';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loadingSpinner: boolean = false;
  constructor(
    ){


     }

    ngOnInit(){
    }
}
