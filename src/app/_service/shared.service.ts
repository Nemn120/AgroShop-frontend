import { Injectable } from '@angular/core';
import { UserBean } from '../_model/UserBean';
import {MultilevelNodes} from 'ng-material-multilevel-menu';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  userSession: any;
  appitems: MultilevelNodes[]=[]
  appitems1:any[]=[]
  messageChange= new Subject<string>();

  constructor() { }

  orderMenuOptionList(menuOption:any[]){
    
   let menuOptionAsc:any[]= menuOption.sort((data1,data2)=>{
      return (data1.orderNumber-data2.orderNumber )
    })
     menuOptionAsc.forEach(menu =>{
      menu=menu.items.sort((data1,data2)=>{
        return (data1.orderNumber-data2.orderNumber )
      })

    });
    console.log(menuOptionAsc);
    this.setMenuOption(menuOptionAsc);
  }
    setMenuOption(menuOption:any[]){
      this.appitems=[];
      menuOption.forEach(menu=>{
        let items=[];
        menu.items.forEach(menuItem =>{
          items.push({
            label:menuItem.label,
            link:menuItem.link,
            faIcon: menuItem.faIcon,
            id:menuItem.id
          })
        })
      
        this.appitems.push({
          label:menu.label,     
          faIcon:menu.faIcon,
          items:items
        });
       
        
      })

      console.log(this.appitems)
  }
}
