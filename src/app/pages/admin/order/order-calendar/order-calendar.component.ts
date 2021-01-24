import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

@Component({
  selector: 'app-order-calendar',
  templateUrl: './order-calendar.component.html',
  styleUrls: ['./order-calendar.component.scss']
})
export class OrderCalendarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
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
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }
}
