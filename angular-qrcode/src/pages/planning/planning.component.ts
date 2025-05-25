import { Component } from '@angular/core';
import { CalendarComponent } from "../../components/calendar/calendar.component";

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.scss'
})
export class PlanningComponent {

}
