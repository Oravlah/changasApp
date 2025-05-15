import { Component, OnInit, EnvironmentInjector, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabButton, IonIcon, IonTabs, IonLabel, IonTabBar, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ellipse, square, triangle } from 'ionicons/icons';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonRouterOutlet, RouterModule, HeaderComponent, IonTabBar, IonLabel, IonTabs, IonIcon, IonTabButton, IonHeader, CommonModule, FormsModule]
})
export class TabsPage implements OnInit {
  public environmentInjector = inject(EnvironmentInjector);
  constructor() {
    addIcons({triangle, ellipse, square});
  }

  ngOnInit() {
  }

}
