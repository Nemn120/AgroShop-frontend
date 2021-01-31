import { Calendar, createElement, DayHeaderContentArg } from '@fullcalendar/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/angular';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import timeGridWeek from '@fullcalendar/timegrid';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { OrderBean } from 'src/app/_model/OrderBean';

@Component({
  selector: 'app-order-calendar',
  templateUrl: './order-calendar.component.html',
  styleUrls: ['./order-calendar.component.scss']
})
export class OrderCalendarComponent implements OnInit {

  orderList: any[] = [];
  primeraVez: boolean = true;

  constructor(
    private restService: RestService,
    public dialog: MatDialog,
    public sharedService: SharedService
  ) { }

  detailDate: any;

    Dates = new Array<Object>();

  ngOnInit(): void {
    this.listData();
  }
  calendar = Calendar;
  calendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'
    },
    eventClick: this.showDetail.bind(this),
    dateClick: this.showDetail(this),
    weekends:true,
    events: []

  };

   showDetail(order?: any){
    if(this.primeraVez){
      this.primeraVez = false;
    }else{
      console.log("order---->",order.event);
    //console.log("order.id:---->",order.event.id);
      let orderSelect = this.orderList.find(f => f.id == order.event.id);

      console.log("ordrSelect:",orderSelect);
      this.dialog.open(OrderDetailsComponent, {
        width: '500px',
        data: orderSelect,
      });
    }

  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends
  }



  //carga los pedidos pendientes
  listData(){

    setTimeout(()=>{
      console.log(this.sharedService.userSession.id);
      let param = {
        id: this.sharedService.userSession.id,
        data: {
          status:"Pendiente"
        }
      };
      this.restService.requestApiRestData('order/gobsf', param).subscribe( result => {
        this.orderList = result.datalist;
        console.log(this.orderList);
          this.calendarOptions.events = [];
          console.log("result.datalist.lenght----->",result.datalist.length);
          console.log(result);
          for(let i=0;i<result.datalist.length; i++){
            let objeto = {title: 'Pedido #'+result.datalist[i].id, date: result.datalist[i].createDate.substring(0,10), id: result.datalist[i].id.toString()};
            this.calendarOptions.events.push(objeto);

          }
          console.log(this.calendarOptions.events);
        }
      );
      this.listData();
    },2000);

  }
}
