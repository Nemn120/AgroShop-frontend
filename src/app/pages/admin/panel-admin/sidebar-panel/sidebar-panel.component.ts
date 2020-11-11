import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MultilevelNodes } from 'ng-material-multilevel-menu';
import { SharedService } from 'src/app/_service/shared.service';

@Component({
  selector: 'app-sidebar-panel',
  templateUrl: './sidebar-panel.component.html',
  styleUrls: ['./sidebar-panel.component.scss']
})
export class SidebarPanelComponent implements OnInit {

  config = {
    classname: 'my-custom-class',
    listBackgroundColor: '#37966F',
    fontColor: '#232F34',
    backgroundColor: '#37966F',
    selectedListFontColor: 'white',
  };

  appitems : MultilevelNodes[] = [];
  public isOpenUiElements = false;

  constructor(
    public sharedData:SharedService,
    private router: Router,
  ){
    
  }
  ngOnInit(): void {
    console.log(this.appitems);
   this.appitems=this.sharedData.appitems;
  }

  public openUiElements() {
    this.isOpenUiElements = !this.isOpenUiElements;
  }
  selectedItem(event:any){
    console.log(event);
    let path=event.link.substr(1);
    console.log(path);
    this.router.navigate([path]);

  }

}
