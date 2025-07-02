import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from "../../components/calendar/calendar.component";
import { UserService } from '../../services/userService';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.scss'
})
export class PlanningComponent {}
