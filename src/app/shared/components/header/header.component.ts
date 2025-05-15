import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  isMobileMenuOpen = false;
  isUserMenuOpen = false;

  constructor() {  }

  ngOnInit() {  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

}
