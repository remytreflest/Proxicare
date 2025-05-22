import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgxScannerQrcodeModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  qrCodeUrl: string | null = null;
  scannerEnabled = false;

  constructor(private http: HttpClient) {}

}
