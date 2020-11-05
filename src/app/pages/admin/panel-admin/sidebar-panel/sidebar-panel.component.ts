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
    //paddingAtStart: true,
    classname: 'my-custom-class',
    listBackgroundColor: '#37966F',
    fontColor: '#232F34',
    backgroundColor: '#37966F',
    selectedListFontColor: 'white',
  };

  appitems : MultilevelNodes[] = [
    {
      label: 'Item 1 (with Font',
      faIcon: 'fab fa-500px',
      items: [
        {
          label: 'Item 1.1',
          link: '/item-1-1',
          faIcon: 'fab fa-accusoft'
        },
        {
          label: 'Item 1.2',
          faIcon: 'fab fa-accessible-icon',
          items: [
            {
              label: 'Item 1.2.1',
              link: '/item-1-2-1',
              faIcon: 'fas fa-allergies'
            },
            {
              label: 'Item 1.2.2',
              faIcon: 'fas fa-ambulance',
              items: [
                {
                  label: 'Item 1.2.2.1',
                  link: 'item-1-2-2-1',
                  faIcon: 'fas fa-anchor'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      label: 'Item 2',
      icon: 'alarm',
      items: [
        {
          label: 'Item 2.1',
          link: '/item-2-1',
          icon: 'favorite'
        },
        {
          label: 'Item 2.2',
          link: '/item-2-2',
          icon: 'favorite_border'
        }
      ]
    },
    {
      label: 'Item 3',
      link: '/item-3',
      icon: 'offline_pin'
    },
    {
      label: 'Item 4',
      link: '/item-4',
      icon: 'star_rate',
      hidden: true
    }
  ];

  
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
    //this.router.navigate([path]);
    this.router.navigate(['product/list']);

  }

}
