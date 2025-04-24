import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgxScannerQrcodeModule, NavbarComponent], // Import du module QR Scanner
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  qrCodeUrl: string | null = null;
  scannerEnabled = false;

  constructor(private http: HttpClient) {}

  generateQRCode() {
    this.http.get('http://localhost:5000/api/qrcode', {
      responseType: 'text',
     }).subscribe(
      response => {
        const matches = response.match(/<img src=\"([^\"]+)\"/);
        if (matches) {
          this.qrCodeUrl = matches[1];
        }
      },
      error => {
        console.error('Erreur lors de la récupération du QR Code', error);
      }
    );
  }
}
