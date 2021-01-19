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
  /*calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2019-04-01' },
      { title: 'event 2', date: '2019-04-02' }
    ]
  };

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }*/
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    weekends: true
  };

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }
}
