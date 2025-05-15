import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { TabsPage } from '../../components/tabs/tabs.page';
import { IonContent, IonHeader, IonFooter, IonToolbar, IonTitle } from "@ionic/angular/standalone";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [IonHeader, RouterModule, IonContent, HeaderComponent,],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
