import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../environment';
import { HealthcareAct } from '../../models/healthcareAct';

@Component({
  selector: 'app-manage-acts',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './manage-acts.component.scss',
  templateUrl: './manage-acts.component.html',
})
export class ManageActsComponent implements OnInit {
  allActs: HealthcareAct[] = [];
  linkedActs: HealthcareAct[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadActs();
  }

  loadActs() {
    this.http.get<HealthcareAct[]>(`${environment.urls.back}/healthcare/acts`).subscribe({
      next: (acts) => (this.allActs = acts),
      error: (err) => console.error('Erreur chargement actes', err)
    });

    this.http.get<HealthcareAct[]>(`${environment.urls.back}/healthcare/acts/user`).subscribe({
      next: (acts) => (this.linkedActs = acts),
      error: (err) => console.error('Erreur chargement actes liés', err)
    });
  }

  isLinked(act: HealthcareAct): boolean {
    return this.linkedActs.some(a => a.Id === act.Id);
  }

  toggleAct(act: HealthcareAct): void {
    if (this.isLinked(act)) {
      this.http.delete(`${environment.urls.back}/healthcare/act/healthcareprofessional/${act.Id}`).subscribe({
        next: () => {
          console.log("Acte supprimé")
          this.linkedActs = this.linkedActs.filter(a => a.Id !== act.Id);
        },
        error: (err) => console.error('Erreur suppression acte', err)
      });
    } else {
      const payload = { healthcareActId: act.Id };

      this.http.post(`${environment.urls.back}/healthcare/act/healthcareprofessional`, payload).subscribe({
        next: () => {
          console.log("Acte ajouté")
          this.linkedActs.push(act); // mise à jour immédiate
        },
        error: (err) => console.error('Erreur ajout acte', err)
      });
    }
  }
}
