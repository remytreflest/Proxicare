import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {

  @ViewChild('fullcalendar') calendarComponent!: FullCalendarComponent;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe(result => {
        if (result.matches) {
          // Mobile
          this.calendarOptions = {
            ...this.calendarOptions,
            initialView: 'listWeek',
            headerToolbar: {
              left: 'title',
              center: '',
              right: 'listWeek,timeGridDay'
            }
          };
        } else {
          // Tablette / Desktop
          this.calendarOptions = {
            ...this.calendarOptions,
            initialView: 'timeGridWeek',
            headerToolbar: {
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }
          };
        }

        setTimeout(() => {
          this.calendarComponent?.getApi()?.updateSize();
        }, 100);
      });
  }
  

  calendarOptions: CalendarOptions = {
    locale: 'fr',
    height: '100%',
    initialView: 'listWeek',
    initialDate : Date.now(),
    allDaySlot: false,
    slotMinTime: '07:00:00',
    slotMaxTime: '21:00:00',
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
    nowIndicator: true,

    headerToolbar: {
      left: 'title',
      center: '',
      right: 'listWeek,timeGridDay'
    },
    buttonText: {
      today: 'Aujourd\'hui',
      month: 'Mois',
      week: 'Semaine',
      day: 'Jour',
      timeGridWeek: 'Semaine',
      listWeek: 'Agenda',
    },
    titleFormat: {month: 'long', year: 'numeric' },
    dayHeaderContent: (args) => {
      if(args.view.type === 'dayGridMonth') {
        return args.date.toLocaleDateString('fr-FR', {weekday:'short'});
      }

      if(args.view.type === 'listWeek' || args.view.type === 'timeGridDay') {
        return args.date.toLocaleDateString('fr-FR', {weekday:'long', month:'long', day:'2-digit' });
      }
      
      return args.date.toLocaleDateString('fr-FR', {weekday:'short', day:'2-digit' });
    },
    firstDay: 1,
    
    
    dateClick: (arg) => this.handleDateClick(arg),
    events: [
      { title: 'event 1', date: '2025-05-24', start: '2025-05-24T10:00:00', end: '2025-05-24T12:00:00' },
      { title: 'event 2', date: '2025-05-25', start: '2025-05-25T14:00:00', end: '2025-05-25T16:00:00' },
    ]
  };

  handleDateClick(arg: DateClickArg) {
    alert('date click! ' + arg.dateStr)
  }
}
