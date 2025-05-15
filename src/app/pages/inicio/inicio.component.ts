import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonItem, IonLabel, IonList, IonHeader, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [IonContent, HeaderComponent, IonHeader, CommonModule, RouterModule, IonItem, IonLabel, IonList, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
