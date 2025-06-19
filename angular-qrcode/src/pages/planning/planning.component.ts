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
export class PlanningComponent implements OnInit {

  constructor(private auth: AuthService, private userService : UserService) {}

  ID_user ?: number | null;

  ngOnInit(): void {
    //BON EN GROS TU PREND LE PUTAIN DE USER ID ET TU LE BALANCE DANS LE CON DE CALENDRIER

    this.auth.user$.subscribe(user =>{
      if(user && user.sub) {
        const userId = user.sub.split('|')[1]; // Auth0 format: "auth0|123456"
          this.userService.getUserById(userId);
          const id = this.userService.getUser()?.Id;
          this.ID_user = id !== undefined ? Number(id) : null;
      }
    })
    
  }
}
