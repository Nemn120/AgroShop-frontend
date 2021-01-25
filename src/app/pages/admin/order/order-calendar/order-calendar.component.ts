import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/angular'; 
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';

@Component({
  selector: 'app-order-calendar',
  templateUrl: './order-calendar.component.html',
  styleUrls: ['./order-calendar.component.scss']
})
export class OrderCalendarComponent implements OnInit {

  constructor(
    private restService: RestService,
    public dialog: MatDialog,
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.listData();
  }
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), 
    weekends:true,
    events: [
      { title: 'Pedido 1', date: '2021-01-21' },
      { title: 'Pedido 2', date: '2021-01-20' },
      { title: 'Pedido 3', date: '2021-01-23' },
      { title: 'Pedido 4', date: '2021-01-18' },
      { title: 'Pedido 5', date: '2021-01-16' }
    ]
    
  };

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends 
  }

  //carga los pedidos pendientes
  listData(){
    let param = {
      id: this.sharedService.userSession.id,
      data: {
        status:"Pendiente"
      }
    };
    this.restService.requestApiRestData('order/gobsf', param)
      .subscribe( result => {
        
        console.log(result);
      }
      );
  }
}
